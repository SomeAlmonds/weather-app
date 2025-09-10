import {images} from '../assets/assets';

const {night, clouds, lightClouds } = images

export function Body(){

    return <div className="body">
        <div className="bg">
            <img src={night} alt="night sky" width={1000}/>
        </div>
        <div className="body-content">

        </div>
    </div>
}