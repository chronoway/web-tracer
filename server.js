// server.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
      <html lang="ko">
        <head>
          <meta charset="UTF-8" />
          
          <!--Google tag (gtag.js) -->
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-0F3RDG9QHW"></script>
          <script> 
            window.dataLayer = window.dataLayer || []; 
            function gtag(){dataLayer.push(arguments);} 
            gtag('js', new Date()); gtag('config', 'G-0F3RDG9QHW', {'cookie_flags': 'SameSite=None;Secure'}); 
          </script>
          <!-- End Google tag (gtag.js) -->

          <!-- Meta Pixel Code -->
          <script>
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '637073014924793');
            fbq('track', 'PageView');
          </script>
          <noscript><img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=637073014924793&ev=PageView&noscript=1"
          /></noscript>
          <!-- End Meta Pixel Code -->

          <!-- KAKAO Pixel Code -->
          <script type="text/javascript" charset="UTF-8" src="//t1.daumcdn.net/adfit/static/kp.js"></script>
          <script type="text/javascript">kakaoPixel('6836918514203145606').pageView();</script>
          <!-- End KAKAO Pixel Code -->

          <!-- Start Tracer Pixel Code -->
<script>
(function() {
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

    // 데이터 준비 및 전송 함수
    async function prepareAndSendData() {
        console.log("Preparing data to send...");

        var gta = getCookie('_gta');
        if (!gta) {
            gta = 'gta_' + Math.random().toString(36).substring(2, 15) + "_" + new Date().getTime().toString(36);
            setCookie('_gta', gta, 730); // 2년 동안 유지되는 쿠키
        }

        // 기본 데이터 준비
        var data = {
            g_ta: gta, // 쿠키에서 생성한 사용자 ID
            g_ga: getCookie('_ga'), // _ga 쿠키 값
            g_fba: getCookie('_fbp'), // _fbp 쿠키 값
            gate_type: getUrlParameter('gate_type'),
            site_code: getUrlParameter('site_code'),
            source: getUrlParameter('source'),
            medium: getUrlParameter('medium'),
            content: getUrlParameter('content'),
            url: window.location.href,
            referrer: document.referrer,
            device: getDeviceType(),
            ip: await getIpAddress(),
            headers: navigator.userAgent, // 헤더 정보
            created_at: new Date().getTime(),
        };

        console.log("Data prepared:", data);
        sendData(data);
    }

    // 데이터 전송 공통 함수
    function sendData(data) {
        var json = JSON.stringify(data);
        console.log("Sending data:", json);
        var xhr = new XMLHttpRequest();
        var referrer = document.referrer;
        xhr.open("POST", "https://lab-tracer.azurewebsites.net/api/gate_api?code=P1t4BqbALqXsrNbVVQM6O2g8QbjIbjg1lk9IzhLxYHUrAzFu-6rHWQ%3D%3D", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState > 0 && getUrlParameter('cmd') === 'ok') { // 요청완료이면서 cmd가 ok 인경우 이동처리
              if (referrer.indexOf('?') === 3) {
                window.location.href = referrer + '&_gta=' + data.g_ta;
              } else {
                window.location.href = referrer + '?_gta=' + data.g_ta;
              }
            }
        };

        xhr.onerror = function () {
            console.error("Request error.");
        };
        xhr.send(json);
    }

    document.addEventListener('DOMContentLoaded', function() {
        // 페이지 로드 시 데이터 전송
        prepareAndSendData();
    });
})();
</script>


          <!-- End Tracer Pixel Code -->
        </head>
        <body>
        </body>
      </html>
  `);
});


// 서버 시작
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});