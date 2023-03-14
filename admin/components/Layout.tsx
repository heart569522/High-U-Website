import DrawerBar from "./Navigation/DrawerBar"

export default function Layout({ children }: any) {
    return (
        <div>
            <DrawerBar />
            {children}
        </div>
    )
}
