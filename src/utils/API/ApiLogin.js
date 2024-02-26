import axios from "axios";

const getAPICall = async (purl, pmethod)=> {
   return await axios({
        url: purl,
        method: pmethod,
      })
      .then((res) => res.data[0])
      // Catch errors if any
      .catch((err) => { }); 
}

export default getAPICall;


