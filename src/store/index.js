// fakeStore used by most all vues
import { reactive, computed } from "vue";
import gamesList from "./ps3games.json";
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
    return filters.viewMode == "ps3"
      ? route.name == "superHome"
        ? data?.games
            //users
            ?.filter((G) => {
              const tcN = route?.params?.name;
              const tg = data.gameTags.players[tcN];
              return tcN ? tg.includes(G.id) : G;
            })
            //genres
            ?.filter((G) =>
              route.params?.genre ? G?.genre.includes(route.params?.genre) : G
            )
            //controllers
            ?.filter((G) => {
              const tc = route.params?.controller;
              const tg = data.gameTags.controllers[tc];
              return tc ? tg.includes(G.id) : G;
            })
            //players
            ?.filter((G) =>
              route?.params?.players ? G?.players == filters?.player : G
            )
            // search
            ?.filter((G) =>
              filters?.search
                ? G.name.toLowerCase().includes(filters.search.toLowerCase())
                : G
            )
        : data.games
            // search ALL (@home)
            ?.filter((G) =>
              filters?.search
                ? G.name.toLowerCase().includes(filters.search.toLowerCase())
                : G
            )
      : data.gamesListSNES
          // search ALL (@snes)
          ?.filter((G) =>
            filters?.search
              ? G.name.toLowerCase().includes(filters.search.toLowerCase())
              : G
          );
  }),
});

const filters = reactive({
  /* filters: watched by display function */
  viewMode: "ps3",
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
});

const getters = reactive({
  getData: () => {
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
