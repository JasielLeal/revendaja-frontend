export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <div className="mx-auto w-full max-w-4xl px-6 py-12 md:py-16">
                <header className="mb-10 space-y-3">
                    <p className="text-sm text-muted-foreground">Última atualização: 02 de fevereiro de 2026</p>
                    <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Política de Privacidade</h1>
                    <p className="text-base text-muted-foreground">
                        Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações
                        ao utilizar o aplicativo Revendaja e os serviços relacionados.
                    </p>
                </header>

                <section className="space-y-8 text-sm leading-relaxed md:text-base">
                    <div className="space-y-3">
                        <h2 className="text-xl font-semibold">1. Quem somos</h2>
                        <p>
                            Controlador dos dados: <strong>Revendaja</strong> ("nós" ou "nosso").
                            Caso precise de informações formais de identificação (CNPJ, endereço, DPO),
                            entre em contato pelos canais indicados ao final.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-xl font-semibold">2. Dados que coletamos</h2>
                        <ul className="list-disc space-y-2 pl-5">
                            <li>Dados de cadastro: nome, e-mail, telefone e informações de perfil.</li>
                            <li>Dados de uso do app: páginas acessadas, eventos, horários e ações realizadas.</li>
                            <li>Dados técnicos: endereço IP, tipo de navegador/dispositivo, sistema operacional.</li>
                            <li>Dados de transações: histórico de compras, assinaturas e status de pagamentos.</li>
                            <li>
                                Dados armazenados localmente: identificadores e preferências guardados por
                                cookies, localStorage e sessionStorage.
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-xl font-semibold">3. Cookies, storage e tecnologias similares</h2>
                        <p>
                            Utilizamos cookies e armazenamento local (localStorage/sessionStorage) para lembrar suas
                            preferências, manter sessões ativas, medir desempenho e melhorar sua experiência.
                            Você pode gerenciar cookies no seu navegador e limpar dados locais a qualquer momento.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-xl font-semibold">4. Compras no app e assinaturas recorrentes</h2>
                        <p>
                            O Revendaja permite compras dentro do aplicativo, incluindo planos e assinaturas
                            com cobrança recorrente. As informações de pagamento são processadas por provedores
                            de pagamento terceirizados e não armazenamos dados completos de cartão. Podemos receber
                            identificadores de transação, status de pagamento e informações necessárias para suporte.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-xl font-semibold">5. Como usamos seus dados</h2>
                        <ul className="list-disc space-y-2 pl-5">
                            <li>Fornecer e manter o funcionamento do aplicativo e das funcionalidades contratadas.</li>
                            <li>Processar compras, renovações e emitir comunicações sobre pagamentos.</li>
                            <li>Personalizar sua experiência e melhorar nossos produtos e serviços.</li>
                            <li>Garantir segurança, prevenir fraudes e cumprir obrigações legais.</li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-xl font-semibold">6. Compartilhamento de dados</h2>
                        <p>
                            Podemos compartilhar dados com fornecedores essenciais (ex.: hospedagem, analytics,
                            atendimento e pagamento) sempre de forma limitada ao necessário. Não vendemos dados pessoais.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-xl font-semibold">7. Base legal (LGPD)</h2>
                        <p>
                            Tratamos seus dados com base em execução de contrato, consentimento (quando aplicável),
                            legítimo interesse e cumprimento de obrigações legais.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-xl font-semibold">8. Seus direitos</h2>
                        <ul className="list-disc space-y-2 pl-5">
                            <li>Confirmar a existência de tratamento e acessar seus dados.</li>
                            <li>Corrigir dados incompletos, inexatos ou desatualizados.</li>
                            <li>Solicitar anonimização, bloqueio ou eliminação quando aplicável.</li>
                            <li>Revogar consentimento e solicitar portabilidade, conforme a lei.</li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-xl font-semibold">9. Retenção e segurança</h2>
                        <p>
                            Mantemos os dados pelo tempo necessário para cumprir finalidades descritas nesta política,
                            obrigações legais e auditorias. Adotamos medidas técnicas e organizacionais para proteger
                            informações contra acesso não autorizado, perda e uso indevido.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-xl font-semibold">10. Alterações desta política</h2>
                        <p>
                            Podemos atualizar esta política periodicamente. Quando isso ocorrer, publicaremos a nova
                            versão com a data de atualização no topo da página.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-xl font-semibold">11. Contato</h2>
                        <p>
                            Para exercer seus direitos ou tirar dúvidas, entre em contato:
                            <br />
                            E-mail: <strong>contato@revendaja.com</strong> 
                        </p>
                    </div>
                </section>
            </div>
        </main>
    )
}