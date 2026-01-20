import { useEffect, useState } from 'react';
import { GithubIcon, LinkedinIcon, MessageCircle } from 'lucide-react';
import { db } from '../../services/firebaseConnection';
import { doc, getDoc } from 'firebase/firestore';

interface SocialLinks {
    github?: string;
    linkedin?: string;
    whatsapp?: string;
}

export function SocialIcons() {
    const [links, setLinks] = useState<SocialLinks>({});

    useEffect(() => {
        const loadSocialLinks = async () => {
            try {
                const docRef = doc(db, 'social', 'link');
                const snapshot = await getDoc(docRef);

                if (snapshot.exists()) {
                    setLinks(snapshot.data());
                }
            } catch (error) {
                console.error('Erro ao carregar redes sociais', error);
            }
        };

        loadSocialLinks();
    }, []);

    return (
        <div className="flex items-center gap-6 mt-6 animate-in fade-in slide-in-from-bottom-2 duration-500">

            {/* GITHUB */}
            {links.github && (
                <SocialIcon
                    href={links.github}
                    label="GitHub"
                    hoverColor="hover:text-gray-900"
                >
                    <GithubIcon size={28} />
                </SocialIcon>
            )}

            {/* LINKEDIN */}
            {links.linkedin && (
                <SocialIcon
                    href={links.linkedin}
                    label="LinkedIn"
                    hoverColor="hover:text-blue-600"
                >
                    <LinkedinIcon size={28} />
                </SocialIcon>
            )}

            {/* WHATSAPP */}
            {links.whatsapp && (
                <SocialIcon
                    href={links.whatsapp}
                    label="WhatsApp"
                    hoverColor="hover:text-green-500"
                >
                    <MessageCircle size={28} />
                </SocialIcon>
            )}
        </div>
    );
}

interface SocialIconProps {
    href: string;
    label: string;
    hoverColor: string;
    children: React.ReactNode;
}

function SocialIcon({ href, label, hoverColor, children }: SocialIconProps) {
    return (
        <a
            href={href}
            target="_blank"
            aria-label={label}
            className={`relative group text-gray-500 transition-all hover:scale-110 ${hoverColor}`}
        >
            {children}

            {/* TOOLTIP */}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all bg-gray-900 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                {label}
            </span>
        </a>
    );
}
