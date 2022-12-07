const {Configuration, OpenAIApi} = require('openai')
const config = new Configuration({apiKey:process.env.OPENAI_API_KEY})
const openai = new OpenAIApi(config);

const generateImage = async (req, res) =>{

    const { prompt, imageSize} = req.body;

    const size = imageSize === "small"? "256x256" : imageSize === "medium" ? "512x512" : "1024x1024"

    try {
        const response = await openai.createImage({
            prompt,
            n:1,
            size
        })
    
        const image_url = response.data.data[0].url
    
        res.status(200).json({
            success:true,
            data:{
                url:image_url,
            }
        })
    } catch (error) {
        if(error.response){
            console.log(error.response.status);
            console.log(error.response.data);
        }else{
            console.log(error.message);
        }
    }
}

module.exports = {generateImage}