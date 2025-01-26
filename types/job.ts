export interface JobItem {
  title: string;
  company: string;
  location: string;
  description: string;
  salary?: string;
  logo_url?: string;
  created_at?: string;
  timestamp: string;
  apply_url: string;
}

export type SearchBoxProps = {
  onSearch: (results: { title: string; location: string }) => void;
  className?: string;
};
