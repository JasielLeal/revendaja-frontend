export function Features() {
    return (
        <div className="overflow-hidden bg-gray-900 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:pt-4 lg:pr-8">
                        <div className="lg:max-w-lg">
                            {/* Eyebrow */}
                            <h2 className="text-base/7 font-semibold text-orange-400">
                                Gestão inteligente
                            </h2>

                            {/* Título */}
                            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">
                                Tudo que você precisa para gerenciar seu negócio
                            </p>

                            {/* Descrição */}
                            <p className="mt-6 text-lg/8 text-gray-300">
                                O Revendaja centraliza vendas, produtos e financeiro em um único
                                app. Mais controle, menos planilhas e decisões baseadas em dados
                                reais.
                            </p>

                            {/* Lista de features */}
                            <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-400 lg:max-w-none">
                                {/* Feature 1 */}
                                <div className="relative pl-9">
                                    <dt className="inline font-semibold text-white mr-1">
                                        <svg
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            className="absolute top-1 left-1 size-5 text-orange-400"
                                        >
                                            <path
                                                d="M5.5 17a4.5 4.5 0 0 1-1.44-8.765 4.5 4.5 0 0 1 8.302-3.046 3.5 3.5 0 0 1 4.504 4.272A4 4 0 0 1 15 17H5.5Z"
                                                clipRule="evenodd"
                                                fillRule="evenodd"
                                            />
                                        </svg>
                                        Controle de vendas em tempo real.
                                    </dt>
                                    <dd className="inline">
                                        Acompanhe pedidos, faturamento e desempenho do seu negócio
                                        conforme as vendas acontecem.
                                    </dd>
                                </div>

                                {/* Feature 2 */}
                                <div className="relative pl-9">
                                    <dt className="inline font-semibold text-white mr-1">
                                        <svg
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            className="absolute top-1 left-1 size-5 text-orange-400"
                                        >
                                            <path
                                                d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Z"
                                                clipRule="evenodd"
                                                fillRule="evenodd"
                                            />
                                        </svg>
                                        Estoque sempre organizado.
                                    </dt>
                                    <dd className="inline">
                                        Cadastre produtos, acompanhe entradas e saídas e evite
                                        perdas por falta ou excesso de estoque.
                                    </dd>
                                </div>

                                {/* Feature 3 */}
                                <div className="relative pl-9">
                                    <dt className="inline font-semibold text-white mr-1">
                                        <svg
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            className="absolute top-1 left-1 size-5 text-orange-400"
                                        >
                                            <path d="M4 13a2 2 0 1 0 0 4h12a2 2 0 1 0 0-4H4Z" />
                                            <path
                                                d="M4.632 3.533A2 2 0 0 1 6.577 2h6.846a2 2 0 0 1 1.945 1.533l1.976 8.234H4l1.976-8.234Z"
                                                clipRule="evenodd"
                                                fillRule="evenodd"
                                            />
                                        </svg>
                                        Financeiro simples e claro.
                                    </dt>
                                    <dd className="inline">
                                        Visualize lucros, despesas e fluxo de caixa sem complicação,
                                        tudo direto no app.
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    {/* Imagem */}
                    <img
                        width="2432"
                        height="1442"
                        src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png"
                        alt="Dashboard do Revendaja"
                        className="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-white/10 sm:w-228 md:-ml-4 lg:-ml-0"
                    />
                </div>
            </div>
        </div>
    );
}
