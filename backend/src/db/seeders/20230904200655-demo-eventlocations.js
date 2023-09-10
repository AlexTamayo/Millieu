module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("EventLocations", [
      {
        longitude: -123.1449,
        latitude: 49.2939,
        streetAddress: "145 West Pender Street",
        city: "Vancouver",
        region: "BC",
        eventId: 1,
        postalCode: "V6B 6H4",
        country: "Canada",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        longitude: -123.1145,
        latitude: 49.2855,
        streetAddress: "278 Howe Street",
        city: "Vancouver",
        region: "BC",
        eventId: 2,
        postalCode: "V6C 3N9",
        country: "Canada",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        longitude: -123.131,
        latitude: 49.2753,
        streetAddress: "420 Richards Street",
        city: "Vancouver",
        region: "BC",
        eventId: 3,
        postalCode: "V6B 2Z4",
        country: "Canada",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        longitude: -123.1438,
        latitude: 49.2744,
        streetAddress: "666 Davie Street",
        city: "Vancouver",
        region: "BC",
        eventId: 4,
        postalCode: "V6Z 1B6",
        country: "Canada",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        longitude: -123.1241,
        latitude: 49.2725,
        streetAddress: "999 Burrard Street",
        city: "Vancouver",
        region: "BC",
        eventId: 5,
        postalCode: "V6Z 1X6",
        country: "Canada",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        longitude: -114.0734,
        latitude: 51.0491,
        streetAddress: "1568 12th Avenue SW",
        city: "Calgary",
        region: "AB",
        eventId: 6,
        postalCode: "T3C 3P2",
        country: "Canada",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        longitude: -114.0782,
        latitude: 51.0428,
        streetAddress: "1777 1st Street SE",
        city: "Calgary",
        region: "AB",
        eventId: 7,
        postalCode: "T2G 2V9",
        country: "Canada",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        longitude: -114.0651,
        latitude: 51.0447,
        streetAddress: "1999 17th Avenue NW",
        city: "Calgary",
        region: "AB",
        eventId: 8,
        postalCode: "T3B 0W8",
        country: "Canada",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        longitude: -114.0725,
        latitude: 51.0472,
        streetAddress: "2111 11th Street NE",
        city: "Calgary",
        region: "AB",
        eventId: 9,
        postalCode: "T2E 7J2",
        country: "Canada",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        longitude: -119.2735,
        latitude: 50.2663,
        streetAddress: "2525 Red Apple Road",
        city: "Vernon",
        region: "BC",
        eventId: 10,
        postalCode: "V1T 9R4",
        country: "Canada",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("EventLocations", null, {});
  },
};
