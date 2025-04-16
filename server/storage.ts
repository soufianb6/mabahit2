import { articles, categories, type Article, type InsertArticle, type Category, type InsertCategory } from "@shared/schema";

export interface IStorage {
  // Categories
  getAllCategories(): Promise<Category[]>;
  getCategoryById(id: number): Promise<Category | undefined>;
  
  // Articles
  getAllArticles(): Promise<Article[]>;
  getLatestArticles(limit: number): Promise<Article[]>;
  getArticleById(id: number): Promise<Article | undefined>;
  getArticlesByCategory(categoryId: number): Promise<Article[]>;
  searchArticles(query: string): Promise<Article[]>;
  createArticle(article: InsertArticle): Promise<Article>;
  createCategory(category: InsertCategory): Promise<Category>;
}

export class MemStorage implements IStorage {
  private categoriesData: Map<number, Category>;
  private articlesData: Map<number, Article>;
  private categoryIdCounter: number;
  private articleIdCounter: number;

  constructor() {
    this.categoriesData = new Map();
    this.articlesData = new Map();
    this.categoryIdCounter = 1;
    this.articleIdCounter = 1;
    
    // Initialize with sample categories
    const sampleCategories: InsertCategory[] = [
      {
        name: "العلوم الطبيعية",
        description: "الفيزياء، الكيمياء، علم الأحياء، علوم الأرض",
        icon: "flask",
        color: "blue",
      },
      {
        name: "العلوم الاجتماعية",
        description: "علم الاجتماع، الاقتصاد، علم النفس، العلوم السياسية",
        icon: "users",
        color: "green",
      },
      {
        name: "الهندسة والتكنولوجيا",
        description: "الهندسة المدنية، الإلكترونية، علوم الحاسوب، الذكاء الاصطناعي",
        icon: "laptop",
        color: "yellow",
      },
      {
        name: "الطب والصحة",
        description: "الطب السريري، الصحة العامة، التغذية، الصيدلة",
        icon: "heart",
        color: "red",
      },
      {
        name: "العلوم الإنسانية",
        description: "التاريخ، الفلسفة، اللغات، الفنون",
        icon: "book",
        color: "purple",
      },
    ];

    sampleCategories.forEach(category => this.createCategory(category));

    // Sample articles will be added after categories
    const sampleArticles: InsertArticle[] = [
      {
        title: "استخدام تقنيات الذكاء الاصطناعي في تطوير مواد متجددة للطاقة الشمسية",
        abstract: "تستعرض هذه الدراسة التطورات الأخيرة في استخدام تقنيات التعلم الآلي لتسريع اكتشاف وتطوير مواد جديدة للخلايا الشمسية مع تحسين كفاءة تحويل الطاقة بنسبة تصل إلى 25%.",
        content: "يعد تطوير مواد جديدة للخلايا الشمسية أمرًا بالغ الأهمية لتحسين كفاءة الطاقة المتجددة. في هذه الدراسة، نستعرض كيفية استخدام الذكاء الاصطناعي والتعلم الآلي لتسريع عملية اكتشاف المواد المناسبة. لقد وجدنا أن استخدام هذه التقنيات يمكن أن يحسن كفاءة تحويل الطاقة بنسبة كبيرة...",
        authors: "د. أحمد محمود، د. سارة الفاضل",
        publishDate: new Date("2023-05-15"),
        categoryId: 1,
        pdfUrl: "/api/pdf/article1.pdf",
      },
      {
        title: "تأثير وسائل التواصل الاجتماعي على التماسك المجتمعي في المجتمعات العربية",
        abstract: "تبحث هذه الدراسة في التأثيرات المتنوعة لمنصات التواصل الاجتماعي على بنية المجتمعات العربية من خلال تحليل بيانات مسحية من خمس دول عربية وتقديم رؤى حول كيفية الاستفادة من هذه المنصات لتعزيز الترابط المجتمعي.",
        content: "شهدت السنوات الأخيرة انتشارًا واسعًا لمنصات التواصل الاجتماعي في العالم العربي، مما أدى إلى تغييرات كبيرة في أنماط التواصل والعلاقات الاجتماعية. تبحث هذه الدراسة في تأثير هذه التغييرات على التماسك المجتمعي من خلال تحليل بيانات جمعت من 5 دول عربية مختلفة...",
        authors: "د. ليلى عبدالله، د. محمد القاسم",
        publishDate: new Date("2023-05-10"),
        categoryId: 2,
        pdfUrl: "/api/pdf/article2.pdf",
      },
      {
        title: "تطوير نظام ذكي للكشف المبكر عن الآفات الزراعية باستخدام الرؤية الحاسوبية",
        abstract: "تقدم هذه الدراسة نظاماً مبتكراً للكشف المبكر عن الأمراض والآفات الزراعية باستخدام تقنيات الرؤية الحاسوبية والشبكات العصبية العميقة، مع تحقيق دقة تشخيص تبلغ 97% في الظروف الميدانية.",
        content: "تعد الآفات الزراعية من أكبر التحديات التي تواجه الإنتاج الزراعي، وتسبب خسائر اقتصادية كبيرة سنويًا. في هذه الدراسة، قمنا بتطوير نظام ذكي يستخدم تقنيات الرؤية الحاسوبية والتعلم العميق للكشف المبكر عن هذه الآفات بدقة عالية...",
        authors: "د. عمر سليمان، م. نور الحسن",
        publishDate: new Date("2023-05-05"),
        categoryId: 3,
        pdfUrl: "/api/pdf/article3.pdf",
      },
      {
        title: "الاستعداد لمواجهة الأوبئة: دروس مستفادة من تجربة كوفيد-19 في المنطقة العربية",
        abstract: "تحلل هذه الدراسة استجابة النظم الصحية في المنطقة العربية لجائحة كوفيد-19 وتقدم إطاراً استراتيجياً لتعزيز الاستعداد المستقبلي للأوبئة من خلال تحسين البنية التحتية الصحية ونظم الإنذار المبكر.",
        content: "كشفت جائحة كوفيد-19 عن تحديات كبيرة في النظم الصحية حول العالم، بما في ذلك الدول العربية. في هذه الدراسة، نحلل استجابة النظم الصحية في المنطقة العربية للجائحة، ونحدد نقاط القوة والضعف في الاستجابة...",
        authors: "د. فاطمة الزهراء، د. خالد الرشيدي، د. هدى العامري",
        publishDate: new Date("2023-05-01"),
        categoryId: 4,
        pdfUrl: "/api/pdf/article4.pdf",
      },
      {
        title: "العمارة الإسلامية المعاصرة: التوازن بين الأصالة والحداثة في تصميم المساجد الحديثة",
        abstract: "تناقش هذه الدراسة التحديات والفرص في تصميم المساجد المعاصرة التي تحافظ على الموروث المعماري الإسلامي مع تلبية احتياجات المجتمعات الحديثة، من خلال تحليل نماذج بارزة من مختلف أنحاء العالم الإسلامي.",
        content: "تمثل المساجد رمزًا مهمًا للهوية الإسلامية والثقافية في العالم العربي والإسلامي. ومع التطور العمراني والتكنولوجي، تواجه تصاميم المساجد تحديات في الموازنة بين الحفاظ على التراث المعماري الإسلامي وتلبية احتياجات المجتمعات المعاصرة...",
        authors: "د. منى الهاشمي، د. يوسف العوضي",
        publishDate: new Date("2023-04-25"),
        categoryId: 5,
        pdfUrl: "/api/pdf/article5.pdf",
      },
      {
        title: "تأثير التغير المناخي على التنوع البيولوجي في النظم البيئية الصحراوية",
        abstract: "ترصد هذه الدراسة الطويلة الأمد التغيرات في التنوع البيولوجي للنظم البيئية الصحراوية في شمال أفريقيا وشبه الجزيرة العربية خلال العقدين الماضيين، وتقدم استراتيجيات للحفاظ على الأنواع المهددة بالانقراض.",
        content: "تعتبر المناطق الصحراوية من أكثر المناطق تأثرًا بالتغير المناخي، وتشكل موطنًا لأنواع فريدة من الكائنات الحية التي تكيفت مع الظروف القاسية. في هذه الدراسة الطويلة الأمد، قمنا برصد التغيرات في التنوع البيولوجي في المناطق الصحراوية بشمال أفريقيا والجزيرة العربية...",
        authors: "د. جمال السعدي، د. هالة الريس",
        publishDate: new Date("2023-04-20"),
        categoryId: 1,
        pdfUrl: "/api/pdf/article6.pdf",
      },
    ];

    sampleArticles.forEach(article => this.createArticle(article));
  }

  // Category methods
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categoriesData.values());
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    return this.categoriesData.get(id);
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const id = this.categoryIdCounter++;
    const newCategory: Category = { ...category, id };
    this.categoriesData.set(id, newCategory);
    return newCategory;
  }

  // Article methods
  async getAllArticles(): Promise<Article[]> {
    return Array.from(this.articlesData.values());
  }

  async getLatestArticles(limit: number): Promise<Article[]> {
    const articles = Array.from(this.articlesData.values())
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
      .slice(0, limit);
    return articles;
  }

  async getArticleById(id: number): Promise<Article | undefined> {
    return this.articlesData.get(id);
  }

  async getArticlesByCategory(categoryId: number): Promise<Article[]> {
    return Array.from(this.articlesData.values())
      .filter(article => article.categoryId === categoryId)
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  }

  async searchArticles(query: string): Promise<Article[]> {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return Array.from(this.articlesData.values())
      .filter(article => 
        article.title.toLowerCase().includes(lowerQuery) || 
        article.abstract.toLowerCase().includes(lowerQuery) || 
        article.content.toLowerCase().includes(lowerQuery) || 
        article.authors.toLowerCase().includes(lowerQuery)
      )
      .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  }

  async createArticle(article: InsertArticle): Promise<Article> {
    const id = this.articleIdCounter++;
    const newArticle: Article = { ...article, id };
    this.articlesData.set(id, newArticle);
    return newArticle;
  }
}

export const storage = new MemStorage();
