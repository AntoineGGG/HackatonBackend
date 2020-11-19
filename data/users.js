let users = [
  {
    id: 0,
    username: 'test',
    email: 'test@test.com',
    password: '12345',
    city: 'Chicago',
    isProducer: false,
  },
  {
    id: 2,
    username: 'alcap',
    email: 'alcapone@boose.com',
    password: 'alcaponechicago',
    isProducer: true,
    name: 'Al Capone',
    city: 'Chicago',
    alcohol: 'Gin',
    ratings: 10,
    orders: [
      {
        buyer: 'Pierre Genthon',
        quantity: 20,
        unitPrice: 3,
        date: '11/21/1925',
      },
      {
        buyer: 'Nathan Vanstaevel',
        quantity: 15,
        unitPrice: 3.5,
        date: '12/02/1925',
      },
      {
        buyer: 'Thomas Ponthoreau',
        quantity: 7,
        unitPrice: 3,
        date: '12/23/1925',
      },
      {
        buyer: 'Donald Duck',
        quantity: 12,
        unitPrice: 4,
        date: '12/31/1925',
      },
    ],
    litiges: [{ buyer: 'Matthieu Martinot', status: 'unpaid' }],
    feedbacks: [
      {
        username: 'Anonymous',
        rating: 9.5,
        message: 'Fast and easy ! Thanks',
      },
      {
        username: 'Anonymous',
        rating: 9,
        message: 'One unit broken but got refund ! Thanks a lot !',
      },
      {
        username: 'Anonymous',
        rating: 10,
        message: 'Good product, good quality. We will meet again !',
      },
    ],
  },
];

module.exports = users