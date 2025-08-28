export interface QuickSearchOption {
  imageUrl: string
  title: string
}

export const quickSearchOptions: QuickSearchOption[] = [
  ["/cabelo.svg", "Cabelo"],
  ["/barba.svg", "Barba"],
  ["/acabamento.svg", "Acabamento"],
  ["/massagem.svg", "Massagem"],
  ["/sobrancelha.svg", "Sobrancelha"],
  ["/hidratacao.svg", "Hidratação"],
].map(([imageUrl, title]) => ({ imageUrl, title }))
