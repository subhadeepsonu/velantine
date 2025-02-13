import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { BASE_URL } from "../constants"
import PinkParticles from "./pinkPartices"

export default function Results() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['results'],
        queryFn: () => axios.get(`${BASE_URL}/submissions`),
    })
    if (isLoading) return <div className="w-full min-h-screen flex flex-col items-center bg-pink-50 justify-center">
        <PinkParticles />
        Loading...</div>
    if (error) return <div className="w-full min-h-screen flex flex-col items-center bg-pink-50 justify-center">
        <PinkParticles />
        Error: {error.message}</div>
    if (data) {
        return (
            <div className="w-full min-h-screen flex flex-col items-center bg-pink-50 justify-center">
                <PinkParticles />
                {JSON.stringify(data.data.data)}
            </div>
        )
    }

}
