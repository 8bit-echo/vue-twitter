console.log("main.js connected");
if (window.jQuery) {console.log('jquery detected');}


new Vue({
  el: '#app',
  data: {
    username: '',
    tweets: [],
    newTweetText: '',
    savedTweets: [],
  },

  methods: {
    submitTweet: function() {
      var newTweet = {
        text: this.newTweetText,
        username: this.username,
        timestamp: this.date,
        saved: false
      }

      this.tweets.push(newTweet);
      this.newTweetText = '';
    },

    fill: function(event) {
      event.target.classList.remove('fa-trash-o');
      event.target.classList.add('fa-trash');
    },

    empty: function(event) {
      event.target.classList.remove('fa-trash');
      event.target.classList.add('fa-trash-o');
    },

    saveTweet: function(index) {
      this.tweets[index].saved = true;
      this.savedTweets.push(this.tweets[index]);
      // var favJSON = JSON.stringify(this.savedTweets);
      // window.localStorage.setItem('favTweets', favJSON);

    },

    faved: function(index) {
      return this.tweets[index].saved ? 'fa-heart' : 'fa-heart-o';
    }
  },

  computed: {
    date: function() {
      var now = new Date().toLocaleTimeString();
      return now;
    }
  },
  
  watch: {
    savedTweets: function(newVal){
      var favJSON = JSON.stringify(this.savedTweets);
      window.localStorage.setItem('favTweets', favJSON);
    }
  },



  mounted() {
    if (window.localStorage.getItem('username')) {
      this.username = window.localStorage.getItem('username');
    } else {
      this.username = window.prompt('What is your username?');
      window.localStorage.setItem('username', this.username);
    }

    if (window.localStorage.getItem('favTweets')) {
      
      this.savedTweets = JSON.parse( window.localStorage.getItem('favTweets'));
      for (var i = 0; i < this.savedTweets.length; i++) {
        this.tweets.push(this.savedTweets[i]);
      }
      
    }


  },

});