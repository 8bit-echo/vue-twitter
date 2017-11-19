console.log('main.js connected');
if (window.jQuery) {
  console.log('jquery detected');
}

new Vue({
  el: '#app',
  data: {
    username: '',
    tweets: [],
    newTweetText: '',
    savedTweets: []
  },

  methods: {
    /**
      * publishes tweet to the feed.
      */
    submitTweet: function() {
      let newTweet = {
        text: this.newTweetText,
        username: this.username,
        timestamp: this.date,
        saved: false
      };

      this.tweets.push(newTweet);
      this.newTweetText = '';
    },

    /**
      * changes the trash icon to be filled in
      * @param event the DOM hover event
      */
    fillTrashIcon: function(event) {
      event.target.classList.remove('fa-trash-o');
      event.target.classList.add('fa-trash');
    },

    /**
      * changes the trash icon to be empty
      * @param event the DOM hover event
      */
    emptyTrashIcon: function(event) {
      event.target.classList.remove('fa-trash');
      event.target.classList.add('fa-trash-o');
    },

    /**
      * saves the tweet to the savedTweets array
      * @param index the index of the tweet in tweets array
      */
    toggleFav: function(index) {
      // If the saved property is false, save to savedTweets
      if (!this.tweets[index].saved) {
        this.tweets[index].saved = true;
        this.savedTweets.push(this.tweets[index]);

      } else {
        this.tweets[index].saved = false;
        // find it's position in the savedTweets array and delete it
        let indexinSaved = this.savedTweets.indexOf(this.tweets[index]);
        this.savedTweets.splice(indexinSaved, 1);
      }
    },

    /**
      * deletes the tweet from the tweets array
      * @param index the index of the tweet in tweets array
      */
    deleteTweet: function(index) {
      this.tweets.splice(index, 1);
    },

    /**
      * Returns the class name for a tweet based on its saved property
      * @param index the index of the tweet in tweets array
      */
    faved: function(index) {
      return this.tweets[index].saved ? 'fa-heart' : 'fa-heart-o';
    }
  },

  computed: {
    date: function() {
      let now = new Date().toLocaleTimeString();
      return now;
    }
  },

  watch: {
    /**
      * Whenever something changes in the savedTweets array, update the persistent browser data
      * @param newVal the new data that was detected from the change
      */

    savedTweets: function(newVal) {
      let favJSON = JSON.stringify(this.savedTweets);
      window.localStorage.setItem('favTweets', favJSON);
    }
  },

  
  mounted: function() {
    // If the user has already done this, don't ask again
    if (window.localStorage.getItem('username')) {
      this.username = window.localStorage.getItem('username');
    
    } else {
      this.username = window.prompt('Enter your username.').replace('@', '');
      window.localStorage.setItem('username', this.username);
    }

    // If the user already saved some tweets, load them in now.
    if (window.localStorage.getItem('favTweets')) {
      this.savedTweets = JSON.parse(window.localStorage.getItem('favTweets'));
      for (let i = 0; i < this.savedTweets.length; i++) {
        this.tweets.push(this.savedTweets[i]);
      }
    }
  }
});