// fakeStore used by most all vues
import { reactive, computed } from "vue";
import gamesList from "./ps3games.json";
import gamesListALL from "./ps3all.json";
import gameTags from "./ps3tags.json";
import gamesListSNES from "./snes.json";
import { useRoute } from "vue-router";

const data = reactive({
  API: process.env.VUE_APP_API,
  games: gamesList,
  gamesList: gamesList,
  gamesListSNES: gamesListSNES,
  gameTags: gameTags,
  theseGames: computed(() => {
    const route = useRoute();
    const v = filters?.viewMode;
    const myList = filters?.myList;
    let dataARR =
      v == "snes" ? gamesListSNES : myList ? gamesList : gamesListALL;

    const userName = route?.params?.name;
    const userGames = data.gameTags.players[userName];
    const genre = route?.params?.genre;
    const controller = route?.params?.controller;
    const conList = data.gameTags.controllers[controller];
    const players = route?.params?.players;
    const search = filters?.search?.toLowerCase();

    // WAN: favorites if in favView
    if (!myList && filters?.viewFavs)
      dataARR = dataARR.filter((G) => filters?.myFavs?.includes(G.id));
    else {
      // LAN: myNav
      if (userName) dataARR = dataARR.filter((G) => userGames.includes(G.id));
      if (genre) dataARR = dataARR.filter((G) => G?.genre.includes(genre));
      if (players) dataARR = dataARR.filter((G) => G?.players == players);
      if (controller) dataARR = dataARR.filter((G) => conList.includes(G.id));
    }
    // ALL: search
    if (search)
      dataARR = dataARR.filter((G) => G.name.toLowerCase().includes(search));

    return dataARR;
  }),
});

const filters = reactive({
  /* filters: watched by display function */
  viewMode: "ps3",
  myList: false,
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
  myFavs: JSON.parse(localStorage.getItem("myFavs")),
});

const getters = reactive({
  getData: () => {
    [filters.loading, data.WAN] = [true, false]; // reset loading/WAN-detect
    fetch(data.API)
      .then((res) => res.json())
      .then((DATA) => {
        filters.loading = false;
        filters.myList = true;
        data.status = DATA;
        if (DATA.on && !data?.drives) getters.postData("drives", "drives");
      })
      .catch(() => {
        filters.loading = false;
        data.WAN = true;
      });
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
