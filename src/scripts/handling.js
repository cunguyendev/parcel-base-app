import faker from 'faker';
import { getRandom } from './random';

export const DATA_LOCAL_NAME = '__App__data__';
const { Helpers } = window;

class Handling {
  constructor(api, record) {
    this.api = api;
    this.record = record;
  }

  start(callback, sending, adding) {
    this.saveInputDataIntoLocalstorage();
    this.getAllOfData(callback, sending, adding);
  }

  saveInputDataIntoLocalstorage() {
    const dataInput = {
      api: this.api,
      record: this.record,
    };

    try {
      localStorage.setItem(DATA_LOCAL_NAME, JSON.stringify(dataInput));
    } catch (error) {
      throw Error(error);
    }
  }

  getAllOfData(callback, sending, adding) {
    Helpers.XHTTPRequest({
      method: 'GET',
      endpoint: this.api,
      body: {},
      response: (response) => {
        const dataResponse = response.data;
        const that = this;

        if (dataResponse.length) {
          const tick = function onTick() {
            dataResponse.forEach((element, index) => {
              setTimeout(() => {
                Helpers.XHTTPRequest({
                  method: 'DELETE',
                  endpoint: `${that.api}/${element.id}`,
                  body: {},
                  response: () => {
                    sending(
                      // eslint-disable-next-line comma-dangle
                      `Removing old data: ${index + 1}/${dataResponse.length}`
                    );
                  },
                  header: {},
                });

                if (index + 1 === dataResponse.length) {
                  const tickv2 = function onTickV2() {
                    const randomData = () => {
                      const types = [
                        'Social',
                        'Law',
                        'World',
                        'Business',
                        'Technology',
                        'Health',
                        'Sport',
                        'Leisure',
                        'Life',
                        'Education',
                        'Tourism',
                        'Vehicle',
                      ];

                      return {
                        createdAt: faker.date.recent().getTime(),
                        title: faker.lorem.sentence(),
                        type: getRandom(types),
                        updatedAt: faker.date.recent().getTime(),
                        content: faker.lorem.paragraphs(),
                        comments: [
                          faker.lorem.sentence(),
                          faker.lorem.sentence(),
                          faker.lorem.sentence(),
                        ],
                        image: faker.random
                          .image()
                          .replace('http://', 'https://'),
                      };
                    };

                    for (let $i = 0; $i < that.record; $i += 1) {
                      setTimeout(() => {
                        Helpers.XHTTPRequest({
                          method: 'POST',
                          endpoint: `${that.api}`,
                          body: randomData(),
                          response: () => {
                            adding(`Adding data: ${$i + 1}/${that.record}`);
                          },
                          header: {
                            'Content-type': 'application/json',
                          },
                        });

                        if ($i + 1 === that.record) {
                          callback();
                        }
                      }, 2500 * $i);
                    }
                  };

                  tickv2();
                }
              }, 2500 * index);
            });
          };

          tick();
        } else {
          sending('Data is empty now!');
          const tickv2 = function onTickV2() {
            const randomData = () => {
              const types = [
                'Social',
                'Law',
                'World',
                'Business',
                'Technology',
                'Health',
                'Sport',
                'Leisure',
                'Life',
                'Aducation',
                'Tourism',
                'Vehicle',
              ];

              return {
                createdAt: faker.date.recent().getTime(),
                title: faker.lorem.sentence(),
                type: getRandom(types),
                updatedAt: faker.date.recent().getTime(),
                content: faker.lorem.paragraphs(),
                comments: [
                  faker.lorem.sentence(),
                  faker.lorem.sentence(),
                  faker.lorem.sentence(),
                ],
                image: faker.random.image().replace('http://', 'https://'),
              };
            };

            for (let $i = 0; $i < that.record; $i += 1) {
              setTimeout(() => {
                Helpers.XHTTPRequest({
                  method: 'POST',
                  endpoint: `${that.api}`,
                  body: randomData(),
                  response: () => {
                    adding(`Adding data: ${$i + 1}/${that.record}`);
                  },
                  header: {
                    'Content-type': 'application/json',
                  },
                });

                if ($i + 1 === that.record) {
                  callback();
                }
              }, 2500 * $i);
            }
          };

          tickv2();
        }
      },
      header: {},
    });

    return this;
  }
}

export default Handling;
