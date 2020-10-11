const pupeteer = require("puppeteer");

 
async function getAnimePage({url, animeName}){

    const browser = await pupeteer.launch();
    const page = await browser.newPage();
    
    await page.goto(`${url}/${animeName}`);


    const data = await page.evaluate(() => {

        const $animeInformation = document.querySelector("#anime"); 
        const $caps = document.querySelector("#listado");


        return {
            animeImage: $animeInformation.querySelector("figure > img").src,
            animeName: $animeInformation.querySelector("section > hgroup > h1").textContent.trim(),
            sinopsis: $animeInformation.querySelector("section > .sinopsis").textContent.trim(),
            lastCap: [...$caps.children][0].textContent,
            url: [...$caps.children][0].querySelector("a").href
        }


    });
    await browser.close();
    return data;
}


async function run(){

    const browser = await pupeteer.launch();
    const page = await browser.newPage();
    const animesList = [];

    async function getPage(){
        await page.goto("https://www.animeid.tv/");
        


       /*  const data = await page.evaluate(() =>{
            
             const $animesToday = document.querySelectorAll(".dia > article");   
             const data = [];
             $animesToday.forEach(anime =>{
                 data.push({
                     href: anime.querySelector("a").href,
                     title: anime.querySelector("figure > img").alt,
                     cap: anime.querySelector("a").firstElementChild.textContent,
                     animePreview: anime.querySelector("figure > img").src
                 });
             })
            return {
                animes: data
            }

        }); */

        
       const data = await page.evaluate(() =>{
            
             const $animes = document.querySelectorAll(".dia");   
             const data = [];
             const animeData = [];
             const animeObject = [];
            let dataAnime;
             $animes.forEach(animesForDay =>{
                
                animeObject.date = animesForDay.previousSibling.textContent;
                dataAnime = [];

                [...animesForDay.children].forEach((anime) =>{
                    
                    
                    dataAnime.push({
                        href: anime.querySelector("a").href,
                        title: anime.querySelector("figure > img").alt,
                        cap: anime.querySelector("a").firstElementChild.textContent,
                        animePreview: anime.querySelector("figure > img").src,
                        date: anime.parentElement.previousSibling.textContent
                    })
                    
                });
                animeObject.push(dataAnime);
                
             })
             return {
                animes: animeObject
            }

        });
      return data;
    }
    
    const animeData = await getPage();
    await browser.close();
    return animeData;

}


module.exports = {
    run,
    getAnimePage
};