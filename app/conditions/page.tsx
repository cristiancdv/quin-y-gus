"use client"

export default function Page() {
    return (
        <div className="mx-auto max-w-3xl px-4 py-8 text-gray-800">
            <h1 className="mb-6 text-3xl font-bold">Términos y condiciones</h1>
            <p className="text-sm text-gray-500 mb-8">Última actualización: 11 de septiembre de 2026</p>

            <div className="space-y-6">
                <section>
                    <h2 className="text-xl font-semibold mb-2">1. Finalidad del sitio</h2>
                    <p>
                        Este sitio web ha sido creado exclusivamente con un propósito personal y festivo: permitir que los invitados a la boda de Quin y Gus confirmen su asistencia mediante el formulario y compartan las fotografías tomadas durante el evento.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">2. Uso de la galería y contenido multimedia</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Las fotos subidas a través de la plataforma están destinadas a ser compartidas dentro del entorno de la celebración con los novios y demás invitados.</li>
                        <li>Los usuarios se comprometen a subir únicamente imágenes apropiadas y respetuosas relacionadas con el evento. Queda prohibido cargar contenido ofensivo, ilegal o que vulnere derechos de terceros.</li>
                        <li>Los organizadores se reservan el derecho de eliminar cualquier archivo multimedia que consideren inadecuado sin previo aviso.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">3. Formulario de asistencia</h2>
                    <p>
                        Los datos proporcionados en el formulario de confirmación de asistencia (RSVP) se utilizan de manera interna y exclusiva por los novios para la organización logística de la boda.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">4. Modificaciones y disponibilidad</h2>
                    <p>
                        Al tratarse de un sitio web de carácter privado y temporal, el acceso al mismo puede ser modificado, suspendido o dado de baja en cualquier momento una vez concluido el evento, sin que esto genere ningún tipo de obligación o derecho adquirido.
                    </p>
                </section>
            </div>
        </div>
    )
}