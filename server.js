// server.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tracking Pixels</title>
  <script>
    // 쿠키 설정 함수
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=None; Secure";
    }

    // 쿠키 읽기 함수
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // URL 파라미터 읽기 함수
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\\+/g, ' '));
    }

    // 디바이스 유형 판별 함수
    function getDeviceType() {
        const userAgent = navigator.userAgent.toLowerCase();
        if (/mobile|android|kindle|silk|midp|phone|(windows .+arm|touch|iemobile)/.test(userAgent)) {
            return 'mobile';
        }
        return 'pc';
    }

    // IP 주소 획득 함수
    async function getIpAddress() {
      try {
          const response = await fetch('https://ipinfo.io/json?token=58ab8efa47c986');
          if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
          }
          const data = await response.json();
          return data.ip;
      } catch (error) {
          console.error('Error fetching IP address:', error);
          return null;
      }
    }

    // 데이터 전송 공통 함수
    function sendData(data) {
      var json = JSON.stringify(data);
      console.log("Sending data:", json);
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "https://lab-tracer.azurewebsites.net/api/gate_api?code=P1t4BqbALqXsrNbVVQM6O2g8QbjIbjg1lk9IzhLxYHUrAzFu-6rHWQ%3D%3D", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(json);
    }

    const scriptsLoaded = {
      google: false,
      facebook: false,
      kakao: false
    };

    function scriptLoaded(scriptName) {
      scriptsLoaded[scriptName] = true;
      if (Object.values(scriptsLoaded).every(Boolean)) {
        allScriptsLoaded();
      }
    }

    async function allScriptsLoaded() {
      console.log('All tracking pixels have been loaded and executed.');
      // 여기서 원하는 이벤트를 실행합니다.
      var gta = getCookie('_gta');
      if (!gta) {
          gta = 'gta_' + Math.random().toString(36).substring(2, 15) + "_" + new Date().getTime().toString(36);
          setCookie('_gta', gta, 730); // 2년 동안 유지되는 쿠키
      }

      // 쿠키가 설정될 때까지 반복해서 확인
      function checkCookies() {
        var g_ga = getCookie('_ga');
        var g_fba = getCookie('_fbp');
        
        if (g_ga && g_fba) {
          getIpAddress().then(ip => {
            // 기본 데이터 준비
            var data = {
              g_ta: gta, // 쿠키에서 생성한 사용자 ID
              g_ga: g_ga, // _ga 쿠키 값
              g_fba: g_fba, // _fbp 쿠키 값
              gate_type: getUrlParameter('gate_type'),
              site_code: getUrlParameter('site_code'),
              source: getUrlParameter('source'),
              medium: getUrlParameter('medium'),
              content: getUrlParameter('content'),
              url: window.location.href,
              referrer: document.referrer,
              device: getDeviceType(),
              ip: ip, // IP 주소
              headers: navigator.userAgent, // 헤더 정보
              created_at: new Date().getTime(),
            };
    
            console.log("Data prepared:", data);
            sendData(data);
            console.log("완료");
            if (document.referrer.indexOf('?') > 0) {
              window.location.href = document.referrer + '&_gta=' + data.g_ta;
            } else {
              window.location.href = document.referrer + '?_gta=' + data.g_ta;
            }
          });
        } else {
          console.log("쿠키가 아직 설정되지 않음. 다시 확인합니다.");
          setTimeout(checkCookies, 100); // 100ms 후에 다시 확인
        }
      }
      
      checkCookies();
    }
  </script>
</head>
<body>
  <div class="container">
    <h1>사이트로 이동중입니다.</h1>
  </div>

  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-0F3RDG9QHW" onload="scriptLoaded('google')"></script>
  <script> 
    window.dataLayer = window.dataLayer || []; 
    function gtag(){dataLayer.push(arguments);} 
    gtag('js', new Date()); 
    gtag('config', 'G-0F3RDG9QHW', {'cookie_flags': 'SameSite=None;Secure'}); 
  </script>
  <!-- End Google tag (gtag.js) -->

  <!-- Meta Pixel Code -->
  <script>
    function fbqLoaded() {
      fbq('init', '637073014924793');
      fbq('track', 'PageView');
      scriptLoaded('facebook');
    }
    
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;t.onload = fbqLoaded;
    s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
  </script>
  <noscript><img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=637073014924793&ev=PageView&noscript=1"
  /></noscript>
  <!-- End Meta Pixel Code -->

  <!-- KAKAO Pixel Code -->
  <script type="text/javascript" charset="UTF-8" src="//t1.daumcdn.net/adfit/static/kp.js" onload="scriptLoaded('kakao')"></script>
  <script type="text/javascript">kakaoPixel('6836918514203145606').pageView();</script>
  <!-- End KAKAO Pixel Code -->
</body>
</html>
  `);
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
