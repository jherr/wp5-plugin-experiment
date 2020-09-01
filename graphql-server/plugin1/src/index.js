module.exports = {
  typeDefs: `type Pokemon {
    name: String
  }
  type Query {
    pokemon: [Pokemon]
  }
`,
  resolvers: {
    Query: {
      pokemon: () => [
        {
          name: "Bulbasaur",
        },
        {
          name: "Pikachu",
        },
        {
          name: "Nidoran",
        },
      ],
    },
  },
};
