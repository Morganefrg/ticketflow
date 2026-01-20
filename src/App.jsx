import { mockTickets } from "./mockTickets";
import { useState } from "react";

export default function App() {
  //Mémoire pour la liste des tickets
  const [tickets, setTickets] = useState (mockTickets);
  //Mémoire pour le texte tapé dans le champ
  const [title, setTitle] = useState("");
  return (
    <div style={{ padding: 20 }}>
      <h1>TicketFlow</h1>

{/* Zone de créqation d'un ticket
input c'est la partie où l'utilisateur tape du texte */}
   <input
  //  placeholder="Titre du ticket"
        placeholder="Titre du ticket"
        // value c'est la valeur actuelle de l'input
        value={title}
        // onChange c'est la fonction qui est appelée à chaque fois que l'utilisateur tape du texte
        onChange={(e) => setTitle(e.target.value)}
      /> 

      <button 
        onClick={() => {
          const newTicket = {
            id: Date.now(),
            title: title 
          };

          setTickets([...tickets, newTicket]);
          setTitle("");
        }}
      >
       Ajouter  
      </button>

      <hr />

      {/*Liste des tickets */}
      {tickets.map((ticket) => (
        <div key={ticket.id} style={{ marginBottom: 10 }}>
          <strong>{ticket.title}</strong> 

          <select
            value={ticket.status}
            onChange={(e) => { 
              const newStatus = e.target.value;

              setTickets(
                tickets.map((t) =>
                  t.id === ticket.id ? { ...t, status: newStatus } : t
                )
              );
            }}
            >
              <option>Open</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
        </div>
      ))}
    </div>
  );
}

