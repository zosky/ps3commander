// fakeStore used by most all vues
import { reactive, computed } from "vue";
import gamesList from "./ps3games.json";
import gameTags from "./ps3tags.json";

const data = reactive({
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

export default {
  data,
  filters,
  //   ...getters
};

// const getters = {
//   GETdata: (what, extra, noSave) => {
//     // IF(!data[what]) ? POST to NR {cmd:what,...extra} > store resp in data[what]
//     if (!data[what]) {
//       const u = `${process.env.VUE_APP_API}/xxx`
//       const theD = {
//         method: 'post',
//         body: JSON.stringify({ cmd: what, ...extra })
//       }
//       fetch(u, theD)
//         .then(res => res.json())
//         .then(DATA => {
//           if (noSave != false) data[what] = DATA
//         })
//     }
//   }
// }
