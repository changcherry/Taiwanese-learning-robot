import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <body>
        <h1>Something About Demi</h1>
      </body>

      <h1>歡迎來到我的網站</h1>
      <h2>我是淡江資管3C的王羽蜨！！</h2>
      <h3>歡迎互相認識交朋友喲~</h3>

      <p>以下是我的自我介紹：</p>

      <a
        href="https://www.outsideonline.com/culture/active-families/how-to-read-dog-body-language-happy-aggressive/">點擊這裡看看可愛小狗狗</a>

      <img src="dog.png" alt="這是一隻可愛的狗！" />

        <table>
          <tr>
            <th>綽號：</th>
            <td>蜨蜨</td>
          </tr>
          <tr>
            <th>年齡：</th>
            <td>20歲</td>
          </tr>
        </table>

        <ol>
          <li>學歷：</li>
          <ul>
            <li>國小：永福國小</li>
            <li>國中：三和國中</li>
            <li>高中：新北高中</li>
            <li>大學：淡江大學</li>
          </ul>
          <li>平常愛好：</li>
          <ul>
            <li>睡覺</li>
            <li>看劇</li>
            <li>唱歌</li>
            <li>吃吃到飽</li>
            <li>上班賺很多錢</li>
          </ul>
          <li>聯絡方式：</li>
          <ul>
            <li>電話：0952-350-818</li>
            <li>電子郵件：demi921227@gmail.com</li>
            <li>Instagram：@_wx.yt__</li>
          </ul>
        </ol>

        <div>
          <strong>我的人生觀：</strong>
          <em>吃飽、喝好、睡好。</em>
        </div>

    </>
  )
}

export default App
