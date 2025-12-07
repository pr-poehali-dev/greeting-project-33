import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Всё');
  const [showCart, setShowCart] = useState(false);

  const products: Product[] = [
    {
      id: 1,
      name: 'Монстера Деликатесная',
      price: 3200,
      category: 'Крупные растения',
      image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=500',
      description: 'Элегантное растение с резными листьями. Высота 80-100 см.'
    },
    {
      id: 2,
      name: 'Фикус Лирата',
      price: 4500,
      category: 'Крупные растения',
      image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=500',
      description: 'Дерево со скрипичными листьями. Идеально для гостиной.'
    },
    {
      id: 3,
      name: 'Сансевиерия',
      price: 1200,
      category: 'Неприхотливые',
      image: 'https://cdn.poehali.dev/files/e792541c-92f9-4337-a110-afa7d38758a7.png',
      description: 'Теневыносливое растение, не требует частого полива.'
    },
    {
      id: 4,
      name: 'Суккуленты в горшке',
      price: 890,
      category: 'Неприхотливые',
      image: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?w=500',
      description: 'Композиция из 3-5 суккулентов в керамическом горшке.'
    },
    {
      id: 5,
      name: 'Калатея Орната',
      price: 2100,
      category: 'Декоративнолистные',
      image: 'https://cdn.poehali.dev/files/7f3755d1-4f61-491d-9d6f-912937fa5a3d.png',
      description: 'Растение с узорчатыми листьями, очищает воздух.'
    },
    {
      id: 6,
      name: 'Замиокулькас',
      price: 2800,
      category: 'Неприхотливые',
      image: 'https://cdn.poehali.dev/files/175f1d09-fed7-4001-bc6c-8bc49fea2cc4.png',
      description: 'Долларовое дерево — символ богатства и благополучия.'
    }
  ];

  const reviews: Review[] = [
    { id: 1, name: 'Анна К.', rating: 5, text: 'Заказала монстеру — пришла в отличном состоянии! Здоровое растение, красивые листья.' },
    { id: 2, name: 'Дмитрий М.', rating: 5, text: 'Беру растения только здесь. Всегда свежие, хорошо упакованы. Консультируют по уходу.' },
    { id: 3, name: 'Мария С.', rating: 5, text: 'Суккуленты прижились отлично! Спасибо за подробную инструкцию по уходу.' }
  ];

  const categories = ['Всё', 'Крупные растения', 'Неприхотливые', 'Декоративнолистные'];

  const filteredProducts = selectedCategory === 'Всё' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setShowCart(true);
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Живой уют</h1>
          
          <nav className="hidden md:flex gap-8">
            <button onClick={() => scrollToSection('home')} className="text-sm hover:text-accent transition-colors">
              Главная
            </button>
            <button onClick={() => scrollToSection('catalog')} className="text-sm hover:text-accent transition-colors">
              Каталог
            </button>
            <button onClick={() => scrollToSection('about')} className="text-sm hover:text-accent transition-colors">
              О нас
            </button>
            <button onClick={() => scrollToSection('reviews')} className="text-sm hover:text-accent transition-colors">
              Отзывы
            </button>
            <button onClick={() => scrollToSection('contacts')} className="text-sm hover:text-accent transition-colors">
              Контакты
            </button>
          </nav>

          <Button variant="outline" size="icon" className="relative" onClick={() => setShowCart(!showCart)}>
            <Icon name="ShoppingCart" size={20} />
            {cartCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {cartCount}
              </Badge>
            )}
          </Button>
        </div>
      </header>

      {showCart && (
        <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowCart(false)}>
          <div 
            className="fixed right-0 top-0 h-full w-full sm:max-w-md bg-background shadow-xl p-6 overflow-y-auto animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Корзина</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowCart(false)}>
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[60vh] text-muted-foreground">
                <Icon name="ShoppingBag" size={64} className="mb-4 opacity-20" />
                <p>Корзина пуста</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4 border-b pb-4">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.price.toLocaleString()} ₽</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button 
                          size="icon" 
                          variant="outline" 
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Icon name="Minus" size={12} />
                        </Button>
                        <span className="text-sm w-8 text-center">{item.quantity}</span>
                        <Button 
                          size="icon" 
                          variant="outline" 
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Icon name="Plus" size={12} />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-6 w-6 ml-auto"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Icon name="X" size={12} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="pt-4 space-y-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Итого:</span>
                    <span>{totalPrice.toLocaleString()} ₽</span>
                  </div>
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => {
                      scrollToSection('checkout');
                      setShowCart(false);
                    }}
                  >
                    Оформить заказ
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setSelectedProduct(null)}>
          <div 
            className="fixed right-0 top-0 h-full w-full sm:max-w-2xl bg-background shadow-xl p-6 overflow-y-auto animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
              <Button variant="ghost" size="icon" onClick={() => setSelectedProduct(null)}>
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <div className="space-y-6">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name}
                className="w-full aspect-square object-cover rounded-lg"
              />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge>{selectedProduct.category}</Badge>
                  <p className="text-2xl font-bold">{selectedProduct.price.toLocaleString()} ₽</p>
                </div>
                
                <p className="text-muted-foreground">{selectedProduct.description}</p>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">Описание</h4>
                  <p className="text-sm text-muted-foreground">
                    Здоровое растение, выращенное в оптимальных условиях. Прошло адаптацию 
                    и готово к переезду в новый дом. Поставляется в транспортировочном горшке.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Уход</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Полив: умеренный, 1-2 раза в неделю</li>
                    <li>• Освещение: рассеянный свет</li>
                    <li>• Температура: 18-25°C</li>
                    <li>• Влажность: опрыскивание 2-3 раза в неделю</li>
                  </ul>
                </div>
                
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                >
                  <Icon name="ShoppingCart" size={20} className="mr-2" />
                  Добавить в корзину
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="pt-16">
        <section id="home" className="min-h-[70vh] flex items-center justify-center bg-secondary/20">
          <div className="container mx-auto px-4 text-center animate-fade-in">
            <Badge className="mb-6" variant="outline">
              Живая красота для вашего дома
            </Badge>
            <h2 className="text-5xl md:text-7xl font-bold mb-6" style={{letterSpacing: '0.08em'}}>
              Живой уют
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto" style={{lineHeight: '1.8'}}>
              Комнатные растения с доставкой.<br />Здоровые, ухоженные, с гарантией приживаемости
            </p>
            <Button size="lg" onClick={() => scrollToSection('catalog')} className="group uppercase tracking-widest text-sm font-medium">
              Смотреть коллекцию
              <Icon name="ArrowRight" size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </section>

        <section id="catalog" className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{letterSpacing: '0.05em'}}>Каталог</h2>
              <p className="text-muted-foreground">Более 100 видов комнатных растений для любого интерьера</p>
            </div>

            <div className="flex justify-center gap-4 mb-8">
              {categories.map(cat => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Card 
                  key={product.id} 
                  className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="aspect-square overflow-hidden bg-secondary/20">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{product.name}</h3>
                      <Badge variant="outline">{product.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                    <p className="text-xl font-bold">{product.price.toLocaleString()} ₽</p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                    >
                      <Icon name="ShoppingCart" size={16} className="mr-2" />
                      В корзину
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-12 bg-secondary/20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{letterSpacing: '0.05em'}}>О нас</h2>
            </div>
            
            <div className="space-y-6 text-center">
              <p className="text-lg">
                <strong className="text-accent">Живой уют</strong> — магазин комнатных растений 
                для тех, кто ценит живую природу в интерьере.
              </p>
              
              <p className="text-muted-foreground">
                Мы выращиваем и отбираем только здоровые растения. Каждое из них проходит 
                карантин и адаптацию перед продажей. Помогаем с выбором и консультируем по уходу.
              </p>

              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                    <Icon name="Leaf" size={32} className="text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">Здоровые растения</h3>
                  <p className="text-sm text-muted-foreground">Карантин и проверка перед отправкой</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                    <Icon name="Heart" size={32} className="text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">Гарантия</h3>
                  <p className="text-sm text-muted-foreground">Замена растения, если оно не прижилось</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                    <Icon name="MessageCircle" size={32} className="text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">Консультации</h3>
                  <p className="text-sm text-muted-foreground">Помогаем выбрать и ухаживать за растениями</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="reviews" className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{letterSpacing: '0.05em'}}>Отзывы</h2>
              <p className="text-muted-foreground">Что говорят наши клиенты</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {reviews.map(review => (
                <Card key={review.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-sm mb-4 italic">"{review.text}"</p>
                    <p className="font-semibold text-sm">{review.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="py-12 bg-secondary/20">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{letterSpacing: '0.05em'}}>Вопросы и ответы</h2>
              <p className="text-muted-foreground">Популярные вопросы об уходе за растениями</p>
            </div>

            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <Icon name="Droplets" size={20} className="text-accent" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Как часто поливать растения?</h3>
                      <p className="text-sm text-muted-foreground">
                        Частота полива зависит от вида растения. Большинство комнатных растений нуждаются в поливе 1-2 раза в неделю летом и реже зимой. Проверяйте почву пальцем — если верхний слой (2-3 см) сухой, пора поливать.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <Icon name="Sun" size={20} className="text-accent" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Сколько света нужно растениям?</h3>
                      <p className="text-sm text-muted-foreground">
                        Большинству растений нужен яркий рассеянный свет. Избегайте прямых солнечных лучей — они могут обжечь листья. Теневыносливые растения (сансевиерия, замиокулькас) хорошо растут и в глубине комнаты.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <Icon name="Thermometer" size={20} className="text-accent" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Какая температура оптимальна?</h3>
                      <p className="text-sm text-muted-foreground">
                        Комнатная температура 18-25°C идеальна для большинства растений. Избегайте сквозняков и резких перепадов температуры. Зимой держите растения подальше от батарей отопления.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <Icon name="Bug" size={20} className="text-accent" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Что делать с вредителями?</h3>
                      <p className="text-sm text-muted-foreground">
                        При появлении вредителей (паутинный клещ, тля) изолируйте растение. Протрите листья мыльным раствором или используйте специальные препараты. Регулярный осмотр помогает выявить проблему на ранней стадии.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <Icon name="Sprout" size={20} className="text-accent" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Когда пересаживать растение?</h3>
                      <p className="text-sm text-muted-foreground">
                        Молодые растения пересаживают раз в год весной, взрослые — раз в 2-3 года. Признаки необходимости пересадки: корни выглядывают из дренажных отверстий, земля быстро пересыхает, рост замедлился.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="checkout" className="py-12 bg-secondary/20">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{letterSpacing: '0.05em'}}>Оформление заказа</h2>
            </div>

            <Card>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Информация о доставке</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Имя</label>
                      <Input placeholder="Ваше имя" />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Телефон</label>
                      <Input placeholder="+7 (___) ___-__-__" />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input type="email" placeholder="your@email.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Адрес доставки</label>
                      <Textarea placeholder="Город, улица, дом, квартира" rows={3} />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Оплата</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Номер карты</label>
                      <Input placeholder="0000 0000 0000 0000" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Срок действия</label>
                        <Input placeholder="MM/YY" />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">CVV</label>
                        <Input placeholder="***" type="password" maxLength={3} />
                      </div>
                    </div>

                    {cart.length > 0 && (
                      <div className="mt-6 pt-6 border-t space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Товары:</span>
                          <span>{totalPrice.toLocaleString()} ₽</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Доставка:</span>
                          <span>Бесплатно</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold pt-2">
                          <span>Итого:</span>
                          <span>{totalPrice.toLocaleString()} ₽</span>
                        </div>
                      </div>
                    )}
                    
                    <Button size="lg" className="w-full mt-6" disabled={cart.length === 0}>
                      Оплатить заказ
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="contacts" className="py-12 bg-background">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{letterSpacing: '0.05em'}}>Контакты</h2>
              <p className="text-muted-foreground">Свяжитесь с нами любым удобным способом</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Icon name="Mail" size={32} className="mx-auto mb-4 text-accent" />
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-muted-foreground">plants@votetovetsh.ru</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <Icon name="Phone" size={32} className="mx-auto mb-4 text-accent" />
                  <h3 className="font-semibold mb-2">Телефон</h3>
                  <p className="text-muted-foreground">+7 (999) 123-45-67</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Напишите нам</h3>
                <div className="space-y-4">
                  <Input placeholder="Ваше имя" />
                  <Input type="email" placeholder="Email" />
                  <Textarea placeholder="Ваше сообщение" rows={4} />
                  <Button className="w-full">
                    <Icon name="Send" size={16} className="mr-2" />
                    Отправить
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Живой уют</h2>
          <p className="text-sm opacity-80 mb-6">Комнатные растения с любовью</p>
          <div className="flex justify-center gap-6">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-accent">
              <Icon name="Instagram" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-accent">
              <Icon name="Facebook" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:text-accent">
              <Icon name="Twitter" size={20} />
            </Button>
          </div>
          <p className="text-xs opacity-60 mt-8">© 2024 Живой уют. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;