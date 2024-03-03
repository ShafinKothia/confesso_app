import React, { useEffect, useState }  from "react";
import { GetImageAPI } from "./functions";
import { Image } from "native-base";

export default function GetImage({image_path}){
    const [image, setImage] = useState(null)
    useEffect(() => {
        GetImageAPI(image_path).then((res) => {
            setImage(res)
        })
    }, [])
    return (
        <Image source={{uri: `${image}`}} alt="_" height={200} width={200} />

    )
}