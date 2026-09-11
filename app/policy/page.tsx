"use client"
export default function Page() {
    return (
        <main className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
            <h1 className="text-3xl font-bold mb-6">Política de Privacidad</h1>
            <p className="text-sm text-gray-500 mb-8">Última actualización: 11 de septiembre de 2026</p>

            <div className="space-y-6">
                <section>
                    <h2 className="text-xl font-semibold mb-2">1. Información que recopilamos</h2>
                    <p>
                        Dado que la aplicación es de uso personal y privado, <strong>no</strong> recopilamos datos personales de forma comercial ni realizamos registros de usuarios. Los únicos elementos presentes en la plataforma son:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Fotografías y archivos multimedia del evento de la boda subidos para la galería.</li>
                        <li>Datos técnicos básicos e inevitables que los servidores (como Vercel) recopilan automáticamente para el funcionamiento técnico (como direcciones IP o registros de conexión).</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">2. Uso de la información</h2>
                    <p>
                        Las fotografías y recuerdos visuales publicados se utilizan exclusivamente con el fin de compartir los momentos del evento con familiares y amigos cercanos. Ninguna información o imagen es cedida, vendida o compartida con terceros con fines comerciales o publicitarios.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">3. Seguridad</h2>
                    <p>
                        Implementamos medidas razonables para proteger el acceso a la plataforma. Sin embargo, al tratarse de un sitio web en internet, ningún sistema es 100% invulnerable.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">4. Contacto</h2>
                    <p>
                        Si tienes alguna duda sobre esta política de privacidad, puedes contactarnos a través del correo electrónico de asistencia configurado en la plataforma (cristiancdv@gmail.com).
                    </p>
                </section>
            </div>
        </main>
    );
}