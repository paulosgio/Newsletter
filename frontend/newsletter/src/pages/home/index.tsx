import { useEffect } from "react";
import { api } from "../../services/api"
import { useCampaignStore } from "../../store/campaignStore";

export default function Home() {

    const campaigns = useCampaignStore((state)=> state.campaigns)
    const fetchCampaigns = useCampaignStore((state)=> state.fetchCampaigns)

    useEffect(()=> {
        fetchCampaigns()
    }, [fetchCampaigns])
    return(
        <>
            <h1>home</h1>
            <button onClick={async ()=> {
                const response = await api.get("/users/me")
                console.log(response.data);
                await api.patch("/users/subscribe")
                alert("Subscribed")
                const response2 = await api.get("/users/me")
                console.log(response2.data);
                
            }}>Quero me inscrever na newsletter</button>
            <button onClick={async ()=> {
                await api.patch("/users/unsubscribe")
                const response = await api.get("/users/me")
                console.log(response.data);
            }}>Unsubscribe</button>
            <ul>
                {campaigns && campaigns.map((state)=> {
                    return(
                        <li key={state.id}>
                            <h1>{state.title}</h1>
                            <h1>{state.subject}</h1>
                            <h1>{state.authorId}</h1>
                            <h1>{String(state.sent)}</h1> {/* quando tiver false aqui, bota a campanha visualmente meio que mais apagadinha, quando tiver true, fica mais cor */}
                        </li>
                    )
                })}
            </ul>
        </>
    )
}