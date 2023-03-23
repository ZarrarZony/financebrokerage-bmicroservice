type WpPost = {
  id: number;
  title: { rendered: string };
  content: { rendered: string; protected: boolean };
  date: Date;
  yoast_head_json: { og_image: [{ url: string }] | undefined } | undefined;
};

type Content = {
  title: string;
  content: string;
};

type Translation = {
  postTitle: string;
  postContent: string;
  langCode: string;
  postId: number;
};

type FailedTranslation = {
  langCode: string;
  reason: string;
};

type Category = {
  id: number;
  name: string;
  image: string | null;
};

export { WpPost, Content, Translation, FailedTranslation, Category };
