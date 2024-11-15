import { useLocation } from "react-router-dom"
export function CamionID() {
    const location = useLocation();
    const {camionData} =location.state || {}
    return (
        <>
        {console.log(camionData)}
        <h1>Camión ID</h1>
        </>
    )
}