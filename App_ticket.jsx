import { mockTickets } from "./mockTickets";
//usememo veut dire de calculer seulement quand une dépendance change
import { useState, useMemo } from "react";

export default function App() {
  //Mémoire pour la liste des tickets
  const [tickets, setTickets] = useState (mockTickets);

  // ---  Creation d'un ticket --- // 
  // usestate -- Mémoire pour le texte tapé dans le champ
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [tags, setTags] = useState(""); // ex:"frontend,performance"

  // États pour les filtres
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [filterTag, setFilterTag] = useState("All");
  const [tagsText, setTagsText] = useState("");

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
    
// Filtre par status 
    const matchesStatus = 
      filterStatus === "All" ? true : t.status === filterStatus;

// Filtre par priorité
    const matchesPriority = 
      filterPriority === "All" ? true : t.priority === filterPriority; 

    // Filtre par tags
    const matchesTags = filterTag === "All" ? true : t.tags.includes(filterTag);

    return matchesSearch && matchesStatus && matchesPriority && matchesTags;
  });
}, [tickets, search, filterStatus, filterPriority, filterTag]);

  return (
    <div style={{ padding: 20, maxWidth: 900 }}>
      <h1>TicketFlow</h1>

  {/* -- cartes compteurs (par status) --- */}
  <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
    <div style={{ padding:10, border: "1px solid #ddd", borderRadius: 8  }}>
      <strong>Open</strong>
      <div>{statusCounts["Open"]}</div>
    </div>
    <div style={{ padding:10, border: "1px solid #ddd", borderRadius: 8  }}>
      <strong>In Progress</strong>
      <div>{statusCounts["In Progress"]}</div>
    </div>  
    <div style={{ padding:10, border: "1px solid #ddd", borderRadius: 8  }}>
      <strong>Done</strong>
      <div>{statusCounts["Done"]}</div>
    </div>
  </div>

  {/* --- Zones filtres --- */}
  <h3>Filtres</h3>
  <div style={{ display: "flex", gap: 10, flexwrap: "wrap", marginBottom: 16 }}> 
    <input
      placeholder="Recherche (titre, description; tags...)"
      value={search}
      onChange={(e) => setSearch (e.target.value)}  
      style={{ padding: 8, minWidth: 206}}      
    />  

    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
      <option value="All">Tous les status</option>
      <option value="Open">Open</option>
      <option value="In Progress">In Progress</option>
      <option value="Done">Done</option>
    </select>

    <select
      value={filterPriority}
      onChange={(e) => setFilterPriority(e.target.value)}
    >
      <option value="All">Toutes les priorités</option>
      <option value="High">High</option>
      <option value="Medium">Medium</option>
      <option value="Low">Low</option>
    </select>

    <select value={filterTag} onChange={(e) => setFilterTag(e.target.value)}>
      <option value="All">Tous les tags</option>
      {alltags.map((tag) => (
        <option key={tag} value={tag}>
          {tag}
        </option>
      ))}
    </select>
  
      <button
        onClick={() => {
          setSearch("");
          setFilterStatus("All");
          setFilterPriority("All");
          setFilterTag("All");
        }}
      >
        Reset
      </button>
  </div>

  {/* Zone de création d'un ticket// */}  
  <h3>Créer un ticket</h3>
  <div style={{ display: "grid", gap: 8, marginBottom: 16 }}>
    <input
  //  placeholder="Titre du ticket"
        placeholder="Titre du ticket"
        // value c'est la valeur actuelle de l'input
        value={title}
        // onChange c'est la fonction qui est appelée à chaque fois que l'utilisateur tape du texte
        onChange={(e) => setTitle(e.target.value)}
      /> 

      <textarea 
        placeholder="Description du ticket"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <input
        placeholder='Tags (séparés par des virgules) ex: "frontend,performance"'
        value={tagsText}
        onChange={(e) => setTagsText(e.target.value)}
      />

      <button 
        onClick={() => {
          const cleanTitle = title.trim();
          if (!cleanTitle) return;

          const tags = tagsText
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);

          const newTicket = {
            id: Date.now(),
            title: cleanTitle,
            description: description.trim(),
            priority,
            tags,
          };

          setTickets([...tickets, newTicket]);
          setTitle("");
          setDescription("");
          setPriority("Medium");
          setTagsText("");  
        }}
      >
       Ajouter  
      </button>
      </div>

      <hr />

      {/* Liste filtré des tickets */}
      <h3>Tickets ({filteredTickets.length})</h3>

      {filteredTickets.map((ticket) => (
        // phrase en dessous pour chaque ticket on affiche un div et on utilise ticket.id comme clé unique
        <div 
        key={ticket.id} 
        style={{ 
        border: "1px solid #ddd",
        padding: 10,
        borderRadius: 8,
        marginBottom: 10 
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap:10 }}>
          <div>
          <strong>{ticket.title}</strong>
          <div style={{ fontSize:12 }}>
            Priority: {ticket.priority} - Status: {ticket.status}
          </div> 
          </div>

          <button 
            onClick={() => {
              setTickets(tickets.filter((t) => t.id !== ticket.id));
            }}
          >
            Supprimer
          </button>
        </div>

        <p style={{ marginTop: 8 }}>{ticket.description}</p>
        
        <div style={{ display: "flex, gap:8", flexWrap: "wrap" }}>
          {ticket.tags.map((tag) => (
            <span
              key={tag}
              style={{
                border: "1px solid #ccc",
                borderRadius: 999,
                padding: "2px 8px",
                fontSize: 12,
              }}
            >
              {tag}
            </span>
          ))} 
        </div>

        <div style={{ marginTop:10}}>
          <label style={{ marginRight: 8 }}>Changer Status :</label>
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

         </div>
        </div>
      ))}
    </div>
  );
}

