'use client';

import { useState } from "react";

import { Checkbox } from "components/Checkbox/Checkbox";
import { ContentTreeItem } from "components/ContentTreeItem/ContentTreeItem";
import { SideBar } from "components/SideBar/SideBar";
import { SideBarItem } from "components/SideBarItem/SideBarItem";

import { useRouter,usePathname } from "next/navigation";
import ContentTreePath from "components/ContentTreePath/ContentTreePath";

export default function SideBarExample() {

    const router = useRouter();
    const pathname = usePathname();

    const [content, setContent] = useState<string | null>(null);

    return (
        <div className="flex h-screen w-screen bg-light-gray">
            <SideBar
                image="https://novoportal.unipam.edu.br/assets/logo_unipam-2d39776e.png"
                imageCollapsed="https://novoportal.unipam.edu.br/assets/logoWhiteMobile-aef87742.svg"
                collapsible={true}
            >
                    <SideBarItem
                        icon={"home_icon"}
                        title="Início"
                        selected={false}
                        onClick={() => router.push('/')}
                    />
                    <SideBarItem
                        icon={"folder_icon"}
                        title="Conteúdo"
                        selected={true}
                        onClick={() => {
                            if (pathname !== '/PageExample') {
                                router.push('/PageExample');
                            }
                        }}
                    />
            </SideBar>
            <SideBar
                colorNavigation="secondary"
                title="Estrutura do conteúdo"
            >
                <ContentTreeItem
                    title="Laminário Patológico"
                    icon="folder_icon"
                    defaultOpen={true}
                    allowAddButton
                    onSelect={(title) => setContent(title)}
                    onAddClick={() => (null)}
                    selectedTitle={content ?? ""}
                    children={[
                        {
                            title: "Estômago",
                            icon: "list_icon",
                            defaultOpen: false,
                            allowAddButton: true
                        },
                        {
                        title: "Fígado",
                        icon: "list_icon",
                        allowAddButton: true,
                        children: [
                            {
                            title: "Esteatose",
                            icon: "collection_icon",
                            allowAddButton: true,
                            children: [
                                { title: "Lâmina 001", 
                                    icon: "file_icon", 
                                    allowAddButton: false
                                }
                            ],
                            },
                        ],
                        },
                    ]}
                />

            </SideBar>
            <main className="ml-70 overflow-y-auto">
                <ContentTreePath 
                    text="Caminho:"
                    path={content ? content : "Nenhum item selecionado"}
                />
                <Checkbox
                        label="Master"
                        checked={true}
                        onChange={(checked) => console.log("Novo estado:", checked)}
                    />
                <Checkbox
                    label="Administrador"
                    checked={true}
                    onChange={(checked) => console.log("Novo estado:", checked)}
                />
            </main>
        </div>
    )
}