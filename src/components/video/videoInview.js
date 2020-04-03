import shaka from "shaka-player";
shaka.polyfill.installAll();

export default class videoInview {

  constructor(config, src, width, app, paths) {

    this.config = config

    this.src = src

    this.width = width

    this.app = app

    this.paths = paths

    this.videos = document.querySelectorAll('.media-player');

    this.interval = null

    this.vid = 0
  
  }

  setup() {

    var self = this

    this.videos.forEach( (video, index) => {

      video.autoplay = this.src[index].autoplay

      video.loop = this.src[index].loop

      video.muted = this.src[index].muted

      video.setAttribute('data-vid', this.src[index].vid);

      video.setAttribute('data-controls', this.src[index].controls);

      video.setAttribute('poster', `https://interactive.guim.co.uk/embed/aus/2020/fires-overview/videos/${self.width}/${this.src[index].src}.jpg`);

      video.setAttribute('crossorigin', 'anonymous');

      console.log(`${this.paths.hls}${this.src[index].src.trim()}/index.m3u8`)

        if (this.app.isApp) { // HLS videos fron embed folder of gdn-cdn

            if (this.app.isAndroid) {

                this.initShakaPlayer(video, `${this.paths.dash}${this.src[index].src.trim()}-manifest.mpd`);

            } else {

                this.initHLSPlayer(video, `${this.paths.hls}${this.src[index].src.trim()}/index.m3u8`)

            }

        } else {

            if (this.app.isIos) {

                this.initHLSPlayer(video, `${this.paths.hls}${this.src[index].src.trim()}/index.m3u8`)

            } else {

                if (shaka.Player.isBrowserSupported()) {

                    this.initShakaPlayer(video, `${this.paths.dash}${this.src[index].src.trim()}-manifest.mpd`);

                } else {  

                    this.initHLSPlayer(video, `${this.paths.hls}${this.src[index].src.trim()}/index.m3u8`)

                } 

            }

        }




    });


    let inview = new IntersectionObserver(function(entries, observer) {

    entries.forEach(video => {

      if (video.isIntersecting) {

        self.vid = video.target.getAttribute('data-vid');

        if (video.target.autoplay) {

          video.target.play(); 

        } else {

          if (self.interval===null) {

            self.setInterval(video.target)

          }

        }

      } else {

        video.target.pause(); 

        if (self.interval!=null) {

          clearTimeout(self.interval);

          self.interval = null

        }

      }

    });

    }, this.config);

    this.videos.forEach( (video, index) => {

      inview.observe(video);

    });

    [].slice.apply(document.querySelectorAll('.video_overlay')).forEach( (overlay,index) => {

        var vid = `${overlay.getAttribute('data-id')}`;

        overlay.addEventListener('click',() => {

            var video = document.querySelector(`#video${vid}`)

            if (overlay.classList.contains('video_play')) {

              overlay.classList.remove('video_play');

              overlay.classList.add('video_pause');

              video.play()

            } else {

              overlay.classList.remove('video_pause');

              overlay.classList.add('video_play');

              video.pause()

            }

        });

    });

  }

  initShakaPlayer(video, manifest) {

    var player = new shaka.Player(video);

    player.load(manifest).then(function() {

      console.log('The video has now been loaded!');

    }).catch(function(error){

      console.error('Error code', error.code, 'object', error);

    });

  }

  initHLSPlayer(video, manifest) {

      var self = this

      video.setAttribute('src', manifest);

      video.load();

  }

  setInterval(element) {

      var self = this

      this.interval = setInterval(function() {

          self.currentState(element).then( (data) => {

            var prog =  100 /  data.duration * data.currentTime

            var bar = document.querySelector(`#progress-bar-${self.vid}`);

            var overlay = document.querySelector(`#video-overlay-${self.vid}`);

            bar.style.width = `${prog}%`;

            if (data.ended && overlay.classList.contains('video_pause') || data.paused && overlay.classList.contains('video_pause')) {

              overlay.classList.remove('video_pause');

              overlay.classList.add('video_play');

            } 

          })

      }, 1000);

  }

  async currentState(vid) {

      var state = {

          "readyState" : vid.readyState,

          "currentTime" : vid.currentTime,

          "paused" : vid.paused,

          "duration" : vid.duration,

          "ended" : vid.ended

      }

      return await state

  }

}
