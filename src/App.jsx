import { mockTickets } from "./mockTickets";
import { useState } from "react";

export default function App() {
  //Mémoire pour la liste des tickets
  const [tickets, setTickets] = useState (mockTickets);

  // ---  Creation d'un ticket --- // 
  // usestate -- Mémoire pour le texte tapé dans le champ
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [tags, setTags] = useState(""); // ex:"frontend,performance"

  //Tags disponibles (pour dropdown)
  const alltags = useMemo(() => {
    const s = new Set();
    tickets.forEach((t) => t.tags.forEach((tag) => s.add(tag)));
    return Array.from(s);
  }, [tickets]);

  // Compteurs par status (pour les cartes)
  const statusCounts = useMemo(() => {
    const counts = { Open: 0, "In Progress": 0, Done: 0 };
    tickets.forEach((t) => {
      if (counts[t.status] !== undefined) counts[t.status] += 1;
    });
    return counts;
  }, [tickets]);
  
// Liste filtrée (recherche +filtres)
const filteredTickets = useMemo(() => {
  const q = search.trim().toLowerCase();

  return tickets.filter((t) => {
    // Recherche (title, description; tags)
    const haystack = 
    (t.title + " " + t.description + " " + t.tags.join(" ")).toLowerCase();
    const matchesSearch = q === "" ? true : haystack.includes (q);
    


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
        // phrase en dessous pour chaque ticket on affiche un div et on utilise ticket.id comme clé unique
        <div key={ticket.id} style={{ marginBottom: 10 }}>
          <strong>{ticket.title}</strong>  

          <select
            value={ticket.status}
            onChange={(e) => { 
              //e.target.value c'est la nouvelle valeur sélectionnée
              const newStatus = e.target.value; 

              setTickets(
                //tickets.map c'est pour créer une nouvelle liste de tickets
                tickets.map((t) =>
                  // t.id === ticket.id c'est pour trouver le ticket à mettre à jour
                  t.id === ticket.id ? { ...t, status: newStatus } : t 
                  // : t c'est pour garder le ticket inchangé, si non on laisse tel quel
                )
              );
            }}
          > 
            <option>Open</option>
            <option>In Progress</option>
            <option>Done</option>
            {/* Ajout des options pour les statuts des tickets */}
          </select>

          <button 
            onClick={() => {
              setTickets(tickets.filter((t) => t.id !== ticket.id));
            }}
          >
            Supprimer
          </button>
        </div>
      ))}
    </div>
  );
}

