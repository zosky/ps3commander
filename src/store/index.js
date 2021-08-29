// fakeStore used by most all vues
import { reactive, computed } from "vue";
import gamesList from "./ps3games.json";
import gameTags from "./ps3tags.json";

const data = reactive({
  API: "http://192.168.1.62:1880/myGames/ps3/status",
  gamesList: gamesList,
  gameTags: gameTags,
  games: computed(() => {
    if (filters?.search) {
      return data.gamesList.filter((g) =>
        g.name.toLowerCase().includes(filters?.search?.toLowerCase())
      );
    } else return data.gamesList;
  }),
});

const filters = reactive({
  /* filters: watched by display function */
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
    filters.loading = true;
    fetch(data.API)
      .then((res) => res.json())
      .then((DATA) => {
        filters.loading = false;
        data.status = DATA;
        if (DATA.on && !data?.drives) getters.postData("drives", "drives");
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
      });
  },
});

export default {
  data,
  filters,
  getters,
};
