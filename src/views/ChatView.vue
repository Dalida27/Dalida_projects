<template>
  <div class="container mx-auto">
    <div class="w-1/2 mt-10 mx-auto">
      <div class="flex items-center mb-5">
        <img class="w-10 h-10 mr-3" :src="confUser.profile.avatar" alt="" />
        <div>
          <p>{{ confUser.surname + " " + confUser.name }}</p>
        </div>
      </div>
      <div class="p-4 bg-white rounded-lg flex flex-col justify-between">
        <div
          class="my-3"
          v-for="message of filteredMessages[0].messages"
          :key="message"
        >
          <p class="font-semibold">{{ message.from }}</p>
          <p>{{ message.text }}</p>
        </div>
        <input
          v-model="chat.messages[0].text"
          class="border p-2 rounded-lg mb-3"
          placeholder="Введите сообщение"
          type="text"
        />
        <button
          class="bg-blue-500 text-white rounded-lg p-2 font-semibold"
          @click="sendMessage()"
        >
          Отправить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "MessagesView",
  data() {
    return {
      users: null,
      curID: this.$route.params.id - 1,
      getMessages: null,
      confUser: null,
      currentUser: localStorage.getItem("loggedUser"),
      chat: {
        personOne: localStorage.getItem("loggedUser"),
        personTwo: null,
        messages: [
          {
            from: localStorage.getItem("loggedUser"),
            text: null,
          },
        ],
      },
    };
  },
  computed: {
    filteredMessages() {
      if (this.getMessages) {
        return this.getMessages.filter(
          (e) =>
            (e.personOne == this.currentUser ||
              e.personOne == this.confUser.email) &&
            (e.personTwo == this.currentUser ||
              e.personTwo == this.confUser.email)
        );
      }
      return [];
    },
    filteredUsers() {
      if (this.users != null) {
        return this.users.filter(
          (e) => e.email == localStorage.getItem("loggedUser")
        );
      } else {
        return console.log("hello");
      }
    },
    allUsers() {
      if (this.users) {
        let arr = this.users.filter(
          (i) => !this.filteredUsers[0].subscriptions.includes(i.email)
        );
        return arr;
      }
      return [];
    },
    friendUsers() {
      if (this.users) {
        let arr = this.users.filter((i) =>
          this.filteredUsers[0].subscriptions.includes(i.email)
        );
        return arr;
      }
      return [];
    },
  },
  methods: {
    async sendMessage() {
      if (this.filteredMessages == null) {
        await axios.post(
          "https://6286235096bccbf32d6fe5bf.mockapi.io/messages",
          this.chat
        );
        this.$router.go();
      } else {
        this.filteredMessages[0].messages.push(this.chat.messages[0]);
        await axios.put(
          "https://6286235096bccbf32d6fe5bf.mockapi.io/messages/" +
            this.filteredMessages[0].id,
          this.filteredMessages[0]
        );
        this.$router.go();
      }
    },
  },
  async mounted() {
    this.users = (
      await axios.get("https://6286235096bccbf32d6fe5bf.mockapi.io/users")
    ).data;
    this.confUser = this.users[this.curID];
    this.chat.personTwo = this.confUser.email;

    this.getMessages = (
      await axios.get("https://6286235096bccbf32d6fe5bf.mockapi.io/messages")
    ).data;
  },
};
</script>