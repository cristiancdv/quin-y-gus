export default function LegalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es">
            <body className="bg-white text-gray-900 antialiased min-h-screen">
                {children}
            </body>
        </html>
    );
}