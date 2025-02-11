import Image from "next/image";
import { Card, CardContent, CardFooter } from "../ui/card";
import { BsFillStarFill } from "react-icons/bs";
import { RiLeafFill } from "react-icons/ri";



interface Props {
    name: string;
    price: number;
    rating: number;
    image: string;
    veggie?: boolean;
}

const PlateCard = ({ name, price, rating, image, veggie }: Props) => {
    return (
        <Card className="p-0 w-fit rounded-md relative">
            <div className="absolute flex badge-container">
                {
                    veggie &&
                    <div className="badge p-1 bg-green-500 text-white rounded-full flex items-center gap-1 z-10 font-bold">
                        <RiLeafFill className="w-3 h-3" />
                    </div>
                }
            </div>

            <CardContent className="p-0 h-14 overflow-hidden rounded-md rounded-b-none flex justify-center items-center relative">
                <Image src={image} alt="Plate" width={110} height={110} />
                <div className="absolute top-0 right-0">
                    <p className="text-xs text-center bg-white rounded-sm px-1 py-1 m-2 flex items-center gap-1">
                        {rating} <BsFillStarFill className="w-3 h-3 text-yellow-500" />
                    </p>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col justify-center items-center px-0 py-1">
                <p className="text-xs font-bold text-center">{name}</p>
                <p className="text-xs text-gray-500 text-center">{price.toFixed(2)}€</p>
            </CardFooter>
        </Card>
    )
}

export default PlateCard;