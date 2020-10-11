const { Client, MessageEmbed, MessageMentions } = require("discord.js");
const { run, getAnimePage }= require("./Utilities/scrapper");

const client = new Client();

client.on("ready", async () =>{
    console.log("Bot is ready for getting information "+ client.user.tag);
   
})


client.on("message", async msg =>{
    const animesData = await run();
    //console.log(animesData);

    if(msg.content === "!animes"){

        const animeNumber = msg.content.split(" ");

        const firstAnime = animesData.animes[2][parseInt(animeNumber[1])];
        console.log(firstAnime);

        const animeInformation = `El anime ${firstAnime.title} ya esta disponible
                                 ${firstAnime.animePreview} 
                                 ${firstAnime.href}`;

        const embed = new MessageEmbed()
        // Set the title of the field
        .setTitle(`${firstAnime.cap}`)
        // Set the color of the embed
        .setColor("#fff200")
        // Set the main content of the embed
        .setDescription(`${firstAnime.title}: ${firstAnime.cap}`)
        .setImage(`${firstAnime.animePreview}`)
        .setURL(`${firstAnime.href}`)
        .setFooter(`${firstAnime.date}`)
      // Send the embed to the same channel as the message
        
        msg.channel.send(embed);
    }

    if(msg.content === "!test"){
        const embed = new MessageEmbed()
      // Set the title of the field
      .setTitle('Un nuevo anime ha sido agregado')
      // Set the color of the embed
      .setColor(0xff0000)
      // Set the main content of the embed
      .setDescription('Hello, this is a slick embed!')
      .setImage("")
    // Send the embed to the same channel as the message
    msg.channel.send(embed);
    }

    if(msg.content.includes("!anime add")){
        const anime = msg.content.split(" ")[2];
        const animeData = getAnimePage({url: "https://www.animeid.tv", animeName: anime});
        
        
        animeData.then((animeData) =>{
            const embed = new MessageEmbed()
            // Set the title of the field
            .setTitle(`${animeData.animeName}`)
            // Set the color of the embed
            .setColor("#fff200")
            // Set the main content of the embed
            .setDescription(`${animeData.sinopsis}`)
            .setImage(`${animeData.animeImage}`)
            .setURL(`${animeData.url}`)
            .setFooter(`${animeData.lastCap}`)
          // Send the embed to the same channel as the message
            
            msg.channel.send(embed);

        }).catch((data) =>{
            const embed = new MessageEmbed()
            // Set the title of the field
            .setTitle(`Error de busqueda`)
            // Set the color of the embed
            .setColor("#ff0000")
            // Set the main content of the embed
            .setDescription(`El anime ${anime} no existe`)
          // Send the embed to the same channel as the message
            
            msg.channel.send(embed);
        })


        console.log(animeData);

    }
    

});

client.login("NzY0NzI3NjQ4NTI5NTQ3Mjk1.X4KeHw.scNg5QaUDENC9QDGZkvwoiH-J68");

