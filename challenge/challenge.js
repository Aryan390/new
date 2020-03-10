(function() {
  let btnSaveGames = document.querySelector("#btnSaveGames");
  let theform = document.querySelector("#nflgamesForm");
  let theradios = document.querySelectorAll("input");
  let thePosturl = "https://prueba3.com/api/postNflPolls";
  let selectedGames = [];
  let theNflurl = "https://prueba3.com/api/viewNlfgamePolls";
  let backdrop = document.querySelector(".backdrop");

  /* Prevent defaults, its necessary, dunno why */
  // Like $('a'), gets all the <a> elements in the document.
  //var aElements = document.getElementsByTagName("a");
  // Create one function object instead of one per <a> element.
  // The calling convention is the same for jQuery as for regular JS.
  // function preventDefaultListener(e) {
  //   e.preventDefault();
  // }
  // For each a element,
  // for (var i = 0, n = aElements.length; i < n; ++i) {
  //   // register the listener to be fired on click.
  //   aElements[i].addEventListener("click", preventDefaultListener);
  // }

  function templateGames(jsonResponse) {
    // console.log(jsonResponse.data);
    return jsonResponse.data
      .map(function(item) {
        // console.log(item.id);
        // console.log(item.nflgameanswers[0]);
        // console.log(item.nflgameanswers[1]);
        return `<div class="thegame"><div>
                    <input class="teamplayer" type="radio" id="${item.nflgameanswers[0].team_id}" data-game="${item.nflgameanswers[0].nflgame_id}" name="${item.nflgameanswers[0].nflgame_id}" value="${item.nflgameanswers[0].team_id}">
                    <label for="${item.nflgameanswers[0].team_id}">
                        <img src="${item.nflgameanswers[0].team.img}">
                        <h4>${item.nflgameanswers[0].team.teamName}</h4>
                    </label>
                </div>

                <div>
                    <input class="teamplayer" type="radio" id="${item.nflgameanswers[1].team_id}" data-game="${item.nflgameanswers[1].nflgame_id}" name="${item.nflgameanswers[1].nflgame_id}" value="${item.nflgameanswers[1].team_id}">
                    <label for="${item.nflgameanswers[1].team_id}">
                        <img src="${item.nflgameanswers[1].team.img}">
                        <h4>${item.nflgameanswers[1].team.teamName}</h4>
                    </label>
                </div>

            </div>`;
      })
      .join("");

    //   <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhASEhISFRUVEBUQEBUVEBAVFRUPFxUWFhUVFRUYHSggGBolHRYWITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGysdHx0tLS0tKy0tLSstLS0tLS0tLS0tLS0tLS0tLS0tLSstLSstLS0rLS0tLS0tLS0tLSs3K//AABEIAMMBAwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAACBQEGB//EADkQAAEDAwMCBQIFAwIGAwAAAAEAAhEDBCEFEjFBUQYTImFxgZEyQqGx8BQjwVLRU2JygqLxFRYz/8QAGgEAAwEBAQEAAAAAAAAAAAAAAQIDAAQFBv/EACgRAAICAgIDAAEDBQEAAAAAAAABAhEDIRIxBBNBYSIyUXGRwfDxI//aAAwDAQACEQMRAD8Ay6QTLWIVFqbY1fTnzwLYulqLsVtqwBR7EKFoOpoD6SdMVixCo5qY2Krmp0AWCPTVHNXWFZmsKAmaBQQi0kjGTH6ITgalqAT9NqmxkC2K2xH2LuxCwixYptR3NVdq1mB7VzajbF3YsYAWqhamixDc1Ywq4Khajuaq7UTWBhccj7UvclY1iFy9ZV1UTt09ZNd6rFCykL1SgORXBULVUSwRaqliPC61iDCmLeSomtqiUez0bGpimUGmUdrVEFhmhW2KtIphoQMBDF19JM+WoWLWZmXUpwVQsWhVppWE6Yoo5iEWwnXMQajU9gOUkdgS9NNsCVhQ/Z5WlQCyrR0FbFAKUh0E2qQjbVA1JY1CzmqoYmHMXW00bNQEMXdqOaa5sWswBzUJzUy4ITwiAWLVwtRYUIWALuCzLx607owF56/rJ4q2ZiN1USDkaqZQYXQkSbBkLhaiwoGImBtarhqIGLjkoQS4oXKLBPQMTNNyAGojSohGmNRWGECm9HGUoR2mQVZzUtSfCepiUj0N2JvYla9FalSjCXe1MpCtGaEGqExXpEGUB/EqiYBdNUDKXIRbd2VmZDlPlblpkArGY1a2nvxClIojS2rm1Ep5CttUbGoCWqzGIpao1q1mKFioWoxVXoJmFHhBeEw9AKshWUDVx4hFISt1UgLGM6/q8rzt0/K0tRr8rHquXRjROTAOCqQrkrgCoIUhXAVwxccsYq5yA8yruVdqAQe1RF2qImPTbFQsTG1RzFzWUoWkhEZVhcc1BhEBo06gKcoVYCyKboTTKyVoKZrtfKo+mkKdUhaFOqHBTaoIrWZKzq1GFsOpIFelMp1IDRj7V0NRajIKgCpYo7bZCct3QUhaGDC0A1RkyiNm0dKaLUhZv4Wi4KE+x0CIVmBdeFWm5D4Y69qE8I7ig1SjEzFXoLRlGeV1rFa9CgHBY+pVYlbV2YC8jqt1JITwVsEujPuqspQhXc5cC6VoicDERrFZjFx71rNQOoUBxlXe5V2omKAKwYihiu2mg2FIDsUTewKJeQaZ6Ly1x7Vtajo1Rku2Q2Adu4EgHGY/mUKlpFZ2wCm71n08dOT7D3K89ZoVdnS8M06ow3tQtq2tW09tN+xr90fi9JaWu6ggrMcxWhkUlaJyjToAWqBFLVQtT2LQei4dU9b0vUACM9VlAI1KoQlYyPRspAYMfRK3tIDISDKxEGT90/TrByltDaZl3VLqEs1a1enCzq9ODKrGViONFmDqtKiZCyqL0/ZuzCExomnaO6LXD/SFhtdBC06D8KMlYyCPegh65UqIAfKZIDGfMQqtRVlDe7KNAOAyU02Eqwqt5cbW8pnsxn65eQIleSrvkp+/e5+58HaDBPQLNcFfHSJzsGQi0W91VoTFzQfTjexzZyNzS2R7Sncl0KosjiOqE2kHHPE/oguJKatjBHZSy2loriSbpltQ0s09rsFrgCDPtmUo1i9reeXVtaZcWktdsgEbmgAxPcLGubNrQ2JmJO4bc9vj3UMXl2qn2Wy+NTuHRltpRyg1qo6KXVQgwlS+MxPaePsr+xEljbLGoolTVP8AAoj7ED1yPu2l/wB5rQ/aTtaCRx6fykH2zjutp7WMDXGBtG0ZAwen3AXkdG1AivDchwAb6eCG8xwJS+q3r3Pe1/ph5kAkt3dxK8D0tzq6R6rzJQsS1GualSo8iNzpjHHA/QLlfQ623f5TiImRBx9FYU5zz/v2W/4eviBtLSe0E8fC6cud4orjujnxYfY3yPEupIflr6tU06m+m9uxm18u/DHrPBMdZXz/AFLTjSeWO6ZB7g8FVweWsrroTN4zx/kyNiqWps0lR1NdPIhxAsMJmm7qELarNCVyGUR9jtwgperRUYnKEOweUOVA42Yz6cFPW4xKYrWnT7LcreFXtywy3Y0xILt/UA8R7pcmeMVsaGGUujHc6QCmrap/PdVF04O8p9GnDDAw4ERyCQcq1w9pEsAa5pJc0Aj0YgwflJHMn8Hlia+nKj0Bj8q1R4S4euhHOxreguqKm5DhEw1RJJAAJPYAkz8JPxGw0w1pPq5dxA7D3WxpFJwZVqt5EMac4nLj7Yj7ry2quLnGZPz3UHlfOl0johiXG2ZdaXO3OO4kzOFW5pzDp6BvwAIGf5wrkwchcr3gA9PPuMJozaaozgmtm34Kaxr6tSqGBjaToqPDSG1fygT1OcKmsai8kuLg9pEGS1wgdI4C80bx+3ZPpBJA6Sev6K1Ik457pZwufNjQmow4FvSSdsxyJ5R6dHqUIAN55TlncsguqAFo6bi3cO0jKo8zS/kmsSk/4CWt01pIIkHEjJB6EL0Nho3n76lSq3ZhjC8tbLzwIJXiK920ucWtcBOATJA6SeqZt6gMOLj8fGVLNBT2nRXFJwdNWei1fwdsgsMk/lj9jwV5m8snMJY5sHiFuW2ubQW/827OcoWp6k2rBIEjqFywnkWmdUo42rWjIZprYEqJkXQ7KJ+cxOMD6H4WpEu3CCB0n1D3+E14tssioG8/iIPt1CzLTWWsktYA4t2uInPwOnRFp6u59M0jBEiC45A9lxyc/bz6HSj6+BnVN27jI/ZP2WsOpvL9rSTyOMHsuajdUxEDp6yJI3exOVmF7TlDly7H48ej22n6x5sMNPbMjkx9FieI6P8Aecc/X/Cv4duthzMHt2TV7cs8xziwPBBAn4ABS4prHN0g5Ic4JHl6lJUNNekrWtOo1gpw10w5pPM8Gf50SNLSnGr5Z9J95XdHyItHHLBKLMR1FQU1s6jp5pO2HJiZHBCVbTyPlNHNatAeOnTK2dMTkTn6J+9sw57PKAlzQdrejxII+0FCLROE1b0JXN7nys6PWuNF6FqXt2uGY5/3VNNdD6zKjwJZDA5xic5HTst60ogRGISviK0BaCOSfxd0ss/L9L+hjh4vkvhk0qzCXSMxk9yh6fa7qzY/1RmCM9M+0rIrktJHWU/oV68VWAAmSJHfKVppaKafYz4jsW0qxDYggOAHSf8AEhZQGU7r12alaocwHENBPAGMLM9QG+DtOAei9PFJqCTPNyxTm2hjC7Tyq0rKrUALWgAztLnNaDHaTlF0OkXvgtw0EunAETgu6ZgIvLGnvoyxSta7PWU6lB1Bzmu2SGtqkDl4/wBQ7S7J915PUdGc7LIeAYLm5E/P1WVd3lR7iTtH5fThu3oB3CrS1l9pO2oW7h6gCM9j8rzuMruL7PRuNVL4Wr6U4B0iCDBHVYlzQI5WhqvjN9WvvZTAZEQcF2I3O9/hO6xSYSC10jaCcRBImPorRnODSkScIz/aecoWu49k1cObTENgnqegQbm8DJjkjgf5WTWrveZK6Ity2yDikHc4kyVY8QhW9Mjr9Ey2nK0pJBjEX2hW83sn7i1aACMmAk6wSrIpDODRUPVXV0Fsq4YeEzoGy/mqIzbL3CiW0GmeobVTBrNbmfhJXA2ktMT1gg/qEm+pJnp0C4pvkWxrijRbcSeVoWzASJhY9sOqebX7O+ccKMmWimeit7trBhucgzwQlhefiiMjIjH0Qm3NOGlx3H8wAgAe/coTb1gJkY6QpR/oUlYZlR0zE5W9b3Lqm17SS9riXwACGEfqMfqldIo06v4ZHXMfWFsWpo0tzWEbphxPKR5kn0b16oLd2PnAS4CDIgZjoCsG6sm06m2Q4AgkfuCt2+vttJxaQXfhMZAPBJ+F5jlX8a2rvRDNS+DrtJeDubBYcgjoPdGtqcHISZujT2tySQHdYjmB3T1G8D+QhJtFIq0a9uyQlNTsiRIn4TVq9o/CZ9k89shS50xuJ8/vLMuPGf5ytLStKdTbuqNLdvrGWgmOmVuV7NolzuB+vssDXbje0y3bBDcE8weewgJ+cpIKikef1Wu1skBskmRztHQdicrIo3Th6g4g8CCQY/hKteGcJUNjldqla2crVPQ4L1xMkyeJK5cai52J/wCqMbu27uR3QWU/2QngdEuh6dAru7Ilobukc5mVm3Vo8FpduLnZAzge5PCerXwZwM98JGvqkwCSY91eHJdIjPj9Zs6Vpz6TfMeGtDmHkAkA8Ee6veXuIBn7fqsWrrz3ANJMABoGOAs+tfOKCxScrkF5IxVRNLc3rEzKuXMg5CwTVKruKt6/yT5/g2m1mojao6LGY49imGVnfwJXEKkaT6xiEq9yC+4MqGvKCVBbssFYyMoTHyRKvWe2cSs3syQD+tPcqIZtz0mPqon5RBUj1FesA90ZEmPhLGvJQ62eENtL3XnxpI6Hdmr/AFY2ho6K9C6Ikd1luoHuuBxC3FfBuT+msXuPBV6e48uWfb1spgVZSu1oPZ6HTNVNNjmtgTgnqqnVHZzlYBqxC6LhL612M5ns9K1IOa6mRJfiWtBIzP1GAuXB2SCdruzhn5heWsr4sIcOeicvtTdVIc7ttAHAA6BaKlF66BKpK32PNrE5LpP7D2Tlq8/wrBo3B7LUtKxP5VpGR6GzD8YK9GxpA+B8yvPWFd2IavSUD6ekrkbuVFekD8zcM8R/5cQvP+KKLW0iGAj1AuIk9IEz+n1W1fu2N9LqbZ6vMer2nErxGs6k/wAtzC8O9WBIdAE5nr+iylK6GUV+48/XbCXqOAEoNe590GpWBBXoRTOZtEr3+ICWdXIHX2QKgE8oNV+OVdJEW39B3VWUi9He6UNwVlKiLVgZK6oXLibkDiXa72R2VR2Se9dD0HsK0POrSuGqkvMVxUQoNjAcrSlg9WFRANjLAmKVImMSl6QKYpVIIU5P+CiX8jjKBj8KiKzV3gAB3HsFFD/0L/oDnTHdcKP04t/M0/Va+reIbSgBvqsMkj0kOIjuBwrU7ihVDXU6lN4dIbtcMxyV5q8mfbR1emPwwKjSgELfrabJ9PHQziPnqs24s3CfldEM8X9IzxSQkHQrisUN5jlDLl0KiDsZ81XFdZlauWkemQTEzxzMhJV9YYyo5pcDAAgfiD8zM+0I2gbZ6VlZEbcLC0x5NNjjHqzxESZAjutOjRJQbQyTs0GXoCao6pHCll4fc8TvY35Tdt4YmZrUwB2krmlnxLTLrDkDUdecFoN8UVA0gGOIOVkV9Mos3AVXOMYgCJ91KNkdpJJDR1P+O6k5Y2rKKM7o0aupUqwmvuc4YbDiIHtHH2XlLpxE5x0WnWZTmGl0QOQJnqvQWvg1jqfmPe8S3cA0N4+oW9sMO3ewSi5Kj5vWqIJqe69TW8PlziACAHbSSCYkSJgLI1HR3UnFpHvj34XZDycctJkJ+NNbMao9BcStH+m9lw2hVvakR9TMtVLlpOsigutU3uTB6mZ7yql6ddbLjbSU3sQPWzPJXCU/UtYQTTCZZEK8bQsAeyu2i7sjIramFnNmUF9AttnIrKQCj66H/URwtcmZqKGw6FzzMoIuXOxJ5nnqm7QAGXAERwSlehlvo4J7KLQpPAAHpUU/Z+CnrPmlKze9lRzQIpNDqhB6EwD8rllbvc5u07SHNEuMAbjA+iBSrEAtk7TyOhI4xwt/wppL67qh81tJjWEuqOJLoH5GtBkyOkRhcsnxTbLrbPfeG/GFMOpWdU+Y8f2w6lSa1gI4Y31QR/zYGPiffmyBERjmMcr4TR05lU06DHsNTzXBtQU9rnA/gcWbQ/bjIMkc8L7Rpb3UWWtB7SDtLHl1Y1DLWkyH8kE8TEfZeT5UYxprs7cLb7A3OgUicmCeBjJ9l5W9tabHuZJ3Dc4t5IbBLY7zH0Tfi3xEaFwyXmDvbR/B6H7du7gkg7m/JHC+cap4jfUrUqrwA5tRr9gBbuZMmXg8EACI4VvGWaW70TyvGtUes1SzaIZ5lOQSXh7H8NbuMfGM+4XgX0AKjYcCAXOcWzkNzugjDT/AtJ9xUdQbPqNV7/7j2g/lbub5pO6fUCR7COqRtK1FlN4c0veXYcCGjY0OBbEzkkGewjrC7YOVbdnO1G9Kjf8ADuotcQH+ktBe0EuLnEl0wY7Ed17W1qDaCHbcB0EeqDkSOi8f4Y1p73SGUQ2mHQNtFhDnSKbi52X7RuEDoV7fQa9tcUzUY0uLnEVC4EE1Bg/4iOijmzOPaK48SfTBPuyDgz7yqPvHHkrUraXQjnb8ux+qX/8AiKfPm49oSR8nF/qGl4+T8f3Fad3CL/Wl0AnA4H7odTT2flqT89fsmKGnN/1HHwQqPNjav/Aqw5F/0f0ykHOBMQDP1XuTqQbTJJ4EYPVeEDdoEPHxlAv9TJG0HEQfdceSDzPRWlFfqPR2+r+bVbuw0Eux3IjKaurSjVBa8Y5EOI+/fqvHaZcw4E91u3WqNjHPH7qWbDxmuJXFJSi7D0vC1u5+N8dt3+U/Q8N2zT/+YPySVkW+rkRlNu1k91OazPXJmqPw1K2j20ZpM+wCyNR8O25aYAb1kGf3S1zqx7n3ysyvqB7rY8WS75M36V3swdVsWMkAmZPMRCxahhegv3B8rz91TiV7fjy1TODOt2hZ9RAc72VbmptE+/v8IDLiZHWYxPzldqpHI7COJVCVDVHUx9VDUGPf/KfkLTJKm4JajcbnGOAM8zM4/Yo0op2BoO2ojMrJKV2nUMxAxnn+dlnRlZsMqugYUSlK5MCf5+iikVs8FKIysREEiOIJHPKEooFhyjelrmPaXNe3h4cQfaI4XqrTx5VmiaznVfKa4eoAbpOA6OcRnuOq8SopzxQn+5WPHJKPRs6zqoqvLgTJcTkN4MRsMS3jhZj6m7nnjjogqJ4xUVSFbbdsbrXjnNY0uJDJ25MRMiB9/uhiuZJxJmZHU9UBRGgDFO5IjrHQ5EcxH0WnpHiWtbH+04AF257Yw7ER7D4hYiiVxT0wqTXQ/c6rVfzUfy4n1u6mYOcr1+j+M2eUynV3Bzdrd2XbhxJ7LwK6EJY4tdDLJJfT6Zq/iJtLYWOYfUN4DmklpMccj2I+q9FY6qxzWuaQ4ObuEgg7eJg5C+IymaOoVW5bUePhxUp+OpKh45mmfZK17APSf2SBrEnuvl79YrkyatQn/qXaesV28Vag/wC5GOHitMDycns+vWbHduPcK9eqes8r5KzxHdDivU4jkcIg8VXf/GP1aw/4UngyN3aK+3HVJM+qMuEf+pxyvkrvFd2RHmxmZDWA/cDhV/8AtF1j+6cOL+G5JiQe49vcrPx5MHsij6y+ulalZfM6vi26dPrAkgiKbMR0BiY+Us7xBcER5rud0iAZiOeyy8eS+meWJ9Fq3kP2mAC2WncJJ6iPhJG5D2F5xlwz2a4tk/Mfqvntxf1Hu3Pe4nvKqLx+fW7JkjceVeOOiTnZu3+qxgY54g/B9v8A2sk3jtxJOecQRujB+EoahMZ44+uVxrCVVWSpDdxdknrODOftHZdqXj9sHdOCDOOs4S49snuu7T3R2DQzY6h5c4mYPx3Wg3VaZMZHueFhkDqIXHMKKk0ZxTPQ/wBfTyA8TE84+6lO4BdO7oOojr/uF5tRNzYPWj1vnjuPuovJKLcwes4uriimUIooosYiiiixiKKKLGIooosYi6uKLGOqKKIoxFFFEV0Yi6VFErGRAooosA4oFFFmAi4oosY6ER/MLqiIGGYMKwUURFZVwQSY4UUWMFawdlHUh2UUSsJQ0wuKKIBP/9k=" alt="image of Philadelphia">

    //  <img src="https://i.logocdn.com/nfl/2013/jacksonville-jaguars.svg">

    //   <img src="${item.nflgameanswers[1].team.img}">
  }

  function renderGames(jsonResponse) {
    console.log("renderGames START");
    let thegames = document.getElementById("thegames");

    thegames.innerHTML = templateGames(jsonResponse);
    console.log("renderGames END");
  }

  function savedGameOn() {
    // backdrop.classList.toggle("close");
    // backdrop.style.background = rgba(50, 50, 50, 0.5);
    let savedgamelegendh1 = document.createElement("h1");
    savedgamelegendh1.innerHTML = "Saved Game!";
    backdrop.append(savedgamelegendh1);
    backdrop.style.display = "block";
    // setTimeout(function() {
    // backdrop.style.background
    // }, 5000);
  }

  function savedGameOff() {
    console.log("savedGameOff()");
    // backdrop.classList.toggle("close");
    // backdrop.style.background = rgba(50, 50, 50, 0.5);
    // let savedgamelegendh1 = document.createElement("h1");
    // savedgamelegendh1.innerHTML = "";
    // backdrop.append(savedgamelegendh1);
    // backdrop.classList.toggle("open");
    setTimeout(function() {
      backdrop.style.display = "none";
    }, 500);
  }

  // Promise
  function xhrrequestPostNflGames(selectedGames) {
    var xhr = new XMLHttpRequest();

    xhr.open("POST", thePosturl, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

    xhr.setRequestHeader(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );

    var sendObject = JSON.stringify({
      selectedGames: selectedGames
    });
    xhr.send(sendObject);

    // console.log(xhr.send()).

    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let jsonResponse = JSON.parse(xhr.responseText);
        // theuser.innerHTML = `${jsonResponse.success.name}`;
        // theToken.innerHTML = `Name: ${jsonResponse.success.name} &nbsp;  &nbsp; Email:${jsonResponse.success.email}`;
        // console.log(jsonResponse);
        savedGameOff();
        // theForm.style.display = "none";
        // console.log("done! shared.js get User disabled");
      }
    };
  }

  function getTeam(item) {
    let gameId = item.dataset.game;
    let teamId = item.value;

    console.log("working!!");
    console.log(gameId);
    console.log(teamId);
    if (item.checked == true) {
      // console.dir(item);

      // One of the two, or a third?
      selectedGames.push([gameId, teamId]);
      // selectedGames.push({ gameId: gameId, teamId: teamId });

      console.log(
        "NFL Game Id: " + item.dataset.game + " | Team Id: " + item.value
      );
    }
  }

  async function fetchNflgames(theNflurl) {
    console.log("fetch START");
    let response = await fetch(theNflurl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });
    let res = await response.json();

    await renderGames(res);

    console.log("fetch END");
  }

  async function xhrloadpreviousNflGames() {
    console.log("loadprev START");
    let theurl = "https://prueba3.com/api/loadPreviousNflPicks";
    let response = await fetch(theurl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });

    let res = await response.json();
    console.log("loadprev END");
    // console.log(res);
    return res;
  }

  async function afterloadprevious(res) {
    console.log("afterload START");

    // console.dir(res);
    // await console.log("what is this" + res);
    res.data.forEach(function(item) {
      console.dir(item);
      let radio1 = document.getElementById(item.nflgameanswer_id);
      // console.log(radio1);
      // console.log("before");
      radio1.setAttribute("checked", true);
    });
    console.log("afterload END");
  }

  btnSaveGames.addEventListener("click", function(e) {
    e.preventDefault();
    savedGameOn();
    selectedGames = [];
    console.log("button clicked!");

    let theradios = document.querySelectorAll("input");
    theradios.forEach(getTeam);

    console.log(selectedGames);
    xhrrequestPostNflGames(selectedGames);
    console.log("the form submitted");
  });

  if (localStorage.getItem("token") !== null) {
    fetchNflgames(theNflurl).then(() => {
      xhrloadpreviousNflGames().then(res => {
        afterloadprevious(res);
      });
    });
  }
})();
