// fakeStore used by most all vues
import { reactive, computed, watchEffect } from "vue";
import gamesPS3 from "./data/games-ps3.json";
import gamesSNES from "./data/games-snes.json";
import gameTags from "./data/ps3tags.json";
import { useRoute } from "vue-router";

const data = reactive({
  // API: process.env.VUE_APP_API,
  API: localStorage.getItem("APIurl"),
  ps3: gamesPS3,
  snes: gamesSNES,
  gameTags: gameTags,
  theseGames: computed(() => {
    // list select
    const route = useRoute();
    const vm = route?.params?.console;
    const v = vm ? vm : filters?.viewMode;
    console.log("theseGame", v);
    let dataARR = v == "ps3" || v == "snes" ? data[v] : [];
    // collect filters
    const userName = route?.params?.name;
    const userGames = data.gameTags.players[userName];
    const genre = route?.params?.genre;
    const controller = route?.params?.controller;
    const conList = data.gameTags.controllers[controller];
    const players = route?.params?.players;
    const search = filters?.search?.toLowerCase();
    // do filters: f/myNav
    if (userName) dataARR = dataARR.filter((G) => userGames?.includes(G.id));
    if (genre) dataARR = dataARR.filter((G) => G?.genre.includes(genre));
    if (players) dataARR = dataARR.filter((G) => G?.players == players);
    if (controller) dataARR = dataARR.filter((G) => conList.includes(G.id));
    // search
    if (search?.length > 2)
      dataARR = dataARR.filter((G) => G.name.toLowerCase().includes(search));
    // sort whats left over // PROPS:https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
    dataARR = dataARR.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
    return dataARR;
  }),
});

const filters = reactive({
  viewMode: "ps3",
  search: null,
  player: null,
  label: false,
  flexWidth: { mobile: 3, big: 6 },
  pager: { p: 0, pp: 100 },
  players: data.ps3
    .reduce(
      (acc, g) => {
        if (!acc.includes(g.players)) acc.push(g.players);
        return acc;
      },
      ["all"]
    )
    ?.sort(),
  genres: data.ps3
    .reduce((acc, g) => {
      g.genre
        .filter((G) => !G.includes("google_ad_section_start"))
        .forEach((genre) => {
          if (!acc.includes(genre)) acc.push(genre);
        });
      return acc;
    }, [])
    ?.sort(),
  location: data.ps3
    .reduce((acc, g) => {
      if (!acc.includes(g?.ps3?.info)) acc.push(g?.ps3?.info);
      return acc;
    }, [])
    ?.sort(),
  apps: data.ps3.filter((g) => g.name.includes("PSN")),
  users: Object.keys(data.gameTags.players),
  controllers: Object.keys(data.gameTags.controllers),
  snes: {
    genres: data?.snes
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
    players: data.snes
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
});

// init data
if (!filters.historyMode) filters.historyMode = "viewed";

// linked data
watchEffect(() => {
  // reset pager on search
  if (filters.search) filters.pager.p = 0;
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
