import {
    create,
    type CredentialCreationOptionsJSON,
} from "@github/webauthn-json";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { toast } from "sonner"



const Dashboard = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:5000/logout', {
                credentials: 'include',
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Logout successful:', data);
                navigate('/login');
            } else {
                console.error('Logout failed:', data.message);
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    async function registerPasskey() {
        const createOptionsResponse = await fetch("http://localhost:5000/passkey/start-registration", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
        });

        const createOptions = await createOptionsResponse.json();
        console.log("createOptions", createOptions)

        const credential = await create(
            createOptions as CredentialCreationOptionsJSON,
        );
        console.log(credential)

        const response = await fetch("http://localhost:5000/passkey/finalize-registration", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(credential),
        });
        console.log(response)

        if (response.ok) {
            toast.success("Registered passkey successfully!");
            return;
        }
    }
    return (
        <div className="p-4">
            <h1>Dashboard</h1>
            <br></br>
            <table>
                <tbody>
                      <tr>
                        <td colspan="2">
                            <div style={{
                                      marginLeft: '4rem',
                                      fontSize: '20px',
                                      padding: '20px',
                                      backgroundColor: 'salmon',
                                      color: 'white',
                                    }}> This is a testing app.</div>
                            
                        </td>
                      </tr>
                      <tr>
                        <td><br></br>
                            <Button onClick={handleLogout}>Logout</Button>
                        </td>
                        <td><br></br>
                            <Button onClick={() => registerPasskey()} > Register a new passkey </Button>
                        </td>
                      </tr>
                </tbody>
            </table>
            
            <div>

            </div>
        </div>
    )
}

export default Dashboard;