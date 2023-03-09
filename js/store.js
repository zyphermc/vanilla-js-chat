//states example
var data = [
  {
    name: "John",
    messages: [
      {
        message: "1",
        owner: "false",
      },
      {
        message: "2",
        owner: "false",
      },
      {
        message: "3",
        owner: "false",
      },
    ],
  },
  {
    name: "Doe",
    messages: [
      {
        message: "a",
        owner: "true",
      },
      {
        message: "b",
        owner: "false",
      },
      {
        message: "c",
        owner: "true",
      },
    ],
  },
  {
    name: "Joe",
    messages: [
      {
        message: "qwe",
        owner: "false",
      },
      {
        message: "asd",
        owner: "true",
      },
      {
        message: "zxc",
        owner: "true",
      },
    ],
  },
];

export const pushMessage = (id, message, owner) => {
  data[id].messages.push({
    message: message,
    owner: owner,
  });
};

export const getCurrentContact = () => {
  return currentContact;
};

export const getData = () => {
  return {...data};
};
