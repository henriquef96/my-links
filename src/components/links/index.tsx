import { useEffect, useState } from "react";
import { db } from "../../services/firebaseConnection";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { ExternalLink } from "lucide-react";

interface LinkProps {
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
}

export function LinksList() {
    const [links, setLinks] = useState<LinkProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const linksRef = collection(db, "links");
        const q = query(linksRef, orderBy("created", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const list: LinkProps[] = [];

            snapshot.forEach((doc) => {
                list.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color,
                });
            });

            setLinks(list);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    if (loading) {
        return (
            <div className="w-full flex flex-col gap-3 mt-6">
                <div className="h-12 bg-gray-200 rounded-xl animate-pulse" />
                <div className="h-12 bg-gray-200 rounded-xl animate-pulse" />
                <div className="h-12 bg-gray-200 rounded-xl animate-pulse" />
            </div>
        );
    }

    if (!links.length) {
        return (
            <p className="text-sm text-gray-400 mt-6">
                Nenhum link cadastrado ainda
            </p>
        );
    }

    return (
        <div className="w-full flex flex-col gap-3 mt-6">
            {links.map((link) => (
                <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ backgroundColor: link.bg, color: link.color }}
                    className="
                        w-full h-12 rounded-xl px-4
                        flex items-center justify-between
                        font-semibold shadow-md
                        transition-all
                        hover:scale-[1.02]
                        hover:shadow-lg
                        active:scale-[0.98]
                    "
                >
                    <span>{link.name}</span>
                    <ExternalLink size={16} />
                </a>
            ))}
        </div>
    );
}
