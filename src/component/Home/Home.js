import React from "react";
import { useEffect, useState } from "react";
import Friend from "../Friend/Friend";
import * as cheerio from 'cheerio';
import request from 'request'
import axios from 'axios';
import * as fs from 'fs';

const Home = () => {
    
    const url = 'https://books.goalkicker.com/'
let linkList = []
let dlinkList = []


const getWebsiteLinks = async (url) => {
  try {
    const response = await axios.get(url)
    const $ = cheerio.load(response.data)
    $('.gs_r').each(function (i, elem) {  
    //   let link = $(elem).find('a').attr('href')
    //   linkList.push(url+link)
      console.log(elem);
    });
  } catch (error) {
    console.error(error)
  }
}

const handleBlur = (event)=>{
    const keyword  = event.target.value;
    const search = keyword.split(" ");
    let searchPart = '';
    search.forEach(search=>{
        searchPart = searchPart +'+'+ search;
    })
    const finalKey = searchPart.substring(1)

    // console.log(finalKey);
    const url = `https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=${finalKey}&oq=`;

    // request(url, (error, response, html)=> {
    //     if(!error && response.statusCode == 200){
    //         const $ = cheerio.load(html);
    //         const div = $('.gs_r');
    //         console.log(div);

    //     }
    // })
    getWebsiteLinks(url)


}


const downloadLinks = async (linkList) => {
  for (const link of linkList) {
    const response = await axios.get(link)
    const $ = cheerio.load(response.data)
    let name = $('.download').attr("onclick")
    name = name.match(/location\.href\s*=\s*['"]([^'"]*)['"]/)
    let dlink = link + name[1]
    dlinkList.push({
      name: name[1],
      dlink: dlink
    })
    
  }
  console.log(dlinkList.length);


}


const downloadFiles = async (dlinkList) => {
  for (const link of dlinkList) {
    let name = link.name + '.pdf'
    let url = link.dlink
    let file = fs.createWriteStream(name)
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    })
    // response.data.pipe(file)
    console.log(response);
  }
}


// async componentDidMount() {
//   await getWebsiteLinks(url);
//   await downloadLinks(linkList);
// //   await downloadFiles(dlinkList)
// }
    
    return (
        <div>
            <input onBlur={handleBlur} type="text" />
        <h1>anik zaman</h1>
        </div>
    );
};

export default Home;
