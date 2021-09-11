// fakeStore used by most all vues
import { reactive, computed, watchEffect } from "vue";
import gamesList from "./data/ps3games.json";
import gamesListALL from "./data/ps3all.json";
import gameTags from "./data/ps3tags.json";
import gamesListSNES from "./data/snes.json";
import gamesTDB from "./data/gametdb.json";
import top20 from "./data/top20.json";
import { useRoute } from "vue-router";

const data = reactive({
  // API: process.env.VUE_APP_API,
  API: localStorage.getItem("APIurl"),
  games: gamesList,
  gamesList: gamesList,
  gamesListSNES: gamesListSNES,
  gameTags: gameTags,
  theseGames: computed(() => {
    const route = useRoute();
    const vm = route?.params?.console;
    const v = vm ? vm : filters?.viewMode;
    const myList = filters?.myList;
    let dataARR =
      v == "snes"
        ? gamesListSNES
        : v == "gametdb"
        ? gamesTDB
        : myList
        ? gamesList
        : gamesListALL;

    const userName = route?.params?.name;
    const userGames = data.gameTags.players[userName];
    const genre = route?.params?.genre;
    const controller = route?.params?.controller;
    const conList = data.gameTags.controllers[controller];
    const players = route?.params?.players;
    const search = filters?.search?.toLowerCase();
    const hasFavs = filters?.myFavs?.length;

    // WAN: favorites if in favView (top20 if none)
    if (!myList && filters?.viewFavs)
      dataARR = dataARR.filter((G) =>
        filters?.[hasFavs ? "myFavs" : "top20"]?.includes(G.id)
      );
    else {
      // LAN: myNav
      if (userName) dataARR = dataARR.filter((G) => userGames?.includes(G.id));
      if (genre) dataARR = dataARR.filter((G) => G?.genre.includes(genre));
      if (players) dataARR = dataARR.filter((G) => G?.players == players);
      if (controller) dataARR = dataARR.filter((G) => conList.includes(G.id));
    }
    // ALL: search
    if (search?.length > 2)
      dataARR = dataARR.filter((G) => G.name.toLowerCase().includes(search));

    // sort whats left over
    // PROPS:https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
    dataARR = dataARR.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );

    return dataARR;
  }),
});

const filters = reactive({
  viewMode: "gametdb",
  search: null,
  player: null,
  myList: false,
  flexWidth: { mobile: 3, big: 6 },
  pager: { p: 0, pp: 100 },
  players: data.games
    .reduce(
      (acc, g) => {
        if (!acc.includes(g.players)) acc.push(g.players);
        return acc;
      },
      ["all"]
    )
    ?.sort(),
  genres: data.games
    .reduce((acc, g) => {
      g.genre
        .filter((G) => !G.includes("google_ad_section_start"))
        .forEach((genre) => {
          if (!acc.includes(genre)) acc.push(genre);
        });
      return acc;
    }, [])
    ?.sort(),
  location: data.games
    .reduce((acc, g) => {
      if (!acc.includes(g?.ps3?.info)) acc.push(g?.ps3?.info);
      return acc;
    }, [])
    ?.sort(),
  apps: data.games.filter((g) => g.name.includes("PSN")),
  users: Object.keys(data.gameTags.players),
  controllers: Object.keys(data.gameTags.controllers),
  snes: {
    genres: data?.gamesListSNES
      ?.reduce((acc, g) => {
        if (g.genre)
          g.genre
            .filter((G) => !G.includes("google_ad_section_start"))
            .forEach((genre) => {
              if (!acc.includes(genre)) acc.push(genre);
            });
        return acc;
      }, [])
      ?.sort(),
    players: data.gamesListSNES
      .reduce(
        (acc, g) => {
          if (g.players && !acc.includes(g.players)) acc.push(g.players);
          return acc;
        },
        ["all"]
      )
      ?.sort(),
  },
  historyMode: localStorage.getItem("historyMode"), // mounted|viewed
  history: {
    viewed: JSON.parse(localStorage.getItem("historyVIEW")), // view log
    mounted: JSON.parse(localStorage.getItem("historyMOUNT")), // mount log
  },
  myFavs: JSON.parse(localStorage.getItem("myFavs")),
  viewFavs: true,
  top20: top20,
});

// init data
if (!filters.historyMode) filters.historyMode = "viewed";

// linked data
watchEffect(() => {
  // reset pager on search
  if (filters.search) filters.pager.p = 0;
});

watchEffect(() => {
  if (filters.myList == "ps3") filters.viewFavs = true;
  else if (filters.myList == "gametdb") filters.viewFavs = false;
});

const getters = reactive({
  getData: () => {
    [filters.loading, data.WAN] = [false, true]; // reset loading/WAN-detect
    if (data.API) {
      [filters.loading, data.WAN] = [true, false]; // reset loading/WAN-detect
      fetch(data.API)
        .then((res) => res.json())
        .then((DATA) => {
          filters.loading = false;
          // filters.myList = true;
          data.status = DATA;
          if (DATA.on && !data?.drives) getters.postData("drives", "drives");
        })
        .catch(() => {
          filters.loading = false;
          data.WAN = true;
        });
    }
  },
  postData: (actionSTR, dataKEY, extraData) => {
    filters.loading = true;
    const theD = extraData
      ? { action: actionSTR, ...extraData }
      : { action: actionSTR };
    fetch(data.API, {
      method: "POST",
      body: JSON.stringify(theD),
    })
      .then((res) => {
        filters.loading = false;
        return res.json();
      })
      .then((DATA) => {
        if (dataKEY) data[dataKEY] = DATA;
      })
      .catch(() => {
        filters.loading = false;
        data.WAN = true;
      });
  },
});

export default {
  data,
  filters,
  getters,
};
