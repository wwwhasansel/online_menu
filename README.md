# 🔴 KIRMIZI ÇIĞKÖFTE - Online Menü

Müşterileriniz için şık ve profesyonel bir online menü platformu.

## ✨ Özellikler

✅ **Google Sheets Entegrasyonu** - Menünüzü Google Sheets'ten yönetin  
✅ **Otomatik Güncelleme** - 30 saniyede bir otomatik senkronizasyon  
✅ **Kategori Filtreleme** - Ürünleri kategorilere göre göster  
✅ **Responsif Tasarım** - Mobil, tablet ve masaüstünde mükemmel görünüş  
✅ **Şık Tasarım** - Kırmızı tema ile profesyonel görünüm  
✅ **Modal Detay Görünümü** - Ürün detaylarını kolayca görmek için  

## 🚀 Hızlı Başlangıç

### 1. Google Sheet'i Hazırlayın

Google Sheet'inizde şu sütunları oluşturun:

| Kategori | Ürün | Açıklama | Fiyat | Resim |
|----------|------|----------|-------|-------|
| Çiğköfte | Kuru Çiğköfte | Tat ve lezzet... | 45.00 | https://example.com/image.jpg |
| Döner | Döner | Taze ve lezzetli... | 50.00 | https://example.com/image2.jpg |

**Önemli:** Sayfanızı **Herkese Açık - Görüntüleyici** olarak paylaşın!

### 2. Sheet ID'nizi Alın

Google Sheet URL'iniz:
```
https://docs.google.com/spreadsheets/d/1LxTe-oUFgT6R2OBOwcBlQAvg_RYRdVNov9Inf8uIeXI/edit
```

ID: `1LxTe-oUFgT6R2OBOwcBlQAvg_RYRdVNov9Inf8uIeXI`

### 3. Logo Yükleyin

- `logo.png` dosyasını projeye ekleyin (80x80 pixel)
- Repository'nin kök dizinine koyun

### 4. GitHub Pages'i Etkinleştirin

1. Repository Settings → Pages
2. Source: `main` branch seçin
3. Save
4. Site adresiniz: `https://wwwhasansel.github.io/online_menu`

## 📋 Dosya Yapısı

```
online_menu/
├── index.html          # Ana sayfa HTML
├── style.css           # Styling (Kırmızı tema)
├── script.js           # Google Sheets entegrasyonu
├── logo.png            # Firmanızın logosu (80x80px)
└── README.md           # Bu dosya
```

## 🔧 Google Sheet Sütunları

| Sütun | Açıklama | Örnek |
|-------|----------|-------|
| **Kategori** | Ürün kategorisi | Çiğköfte, Döner, Salata |
| **Ürün** | Ürün adı | Kuru Çiğköfte, İslim Döner |
| **Açıklama** | Kısa açıklama | Taze çiğköfte, baharatl ve lezzetli |
| **Fiyat** | Fiyat (sayı) | 45.00, 50.00 |
| **Resim** | Resim URL'si | https://example.com/image.jpg |

## 🎨 Tasarım Özellikleri

- **Renk Şeması**: Kırmızı (#c41e3a) ve Beyaz
- **Grid Layout**: Responsif ürün kartları
- **Kategoriler**: Dinamik kategori filtreleri
- **Modal**: Ürün detayları için pop-up
- **Animasyonlar**: Smooth hover efektleri

## 🔄 Otomatik Güncelleme

Google Sheet'inizi güncelledikten 30 saniye içinde website'de görünecektir. El ile yenilemek için sayfayı refresh edin.

## 💡 İpuçları

1. **Resim URL'leri**: Doğru ve aktif URL'ler kullanın
2. **Kategori Adları**: Tutarlı yazım kullanın (örn: "Çiğköfte" her zaman aynı şekilde)
3. **Fiyat Formatı**: Sadece sayı girin (45.00, 50)
4. **Açıklamalar**: Kısa tutun (2-3 satır görüntülenecek)

## 🐛 Sorun Giderme

### Ürünler görünmüyor
- Google Sheet'in herkese açık olduğunu kontrol edin
- Sütun adlarının tam olarak "Kategori, Ürün, Açıklama, Fiyat, Resim" olduğunu kontrol edin
- Browser console'da (F12) hata mesajlarını kontrol edin

### Resimler yüklenmemiş
- Resim URL'lerinin doğru olduğunu ve aktif olduğunu kontrol edin
- HTTPS protokolü kullanan URL'ler tercih edin

### GitHub Pages'te görünmüyor
- Repository Settings → Pages kontrol edin
- Branch olarak "main" seçili olduğunu kontrol edin
- 1-2 dakika bekleyin, sitenin yayınlanması biraz zaman alır

## 📞 İletişim ve Destek

Eğer sorun yaşıyorsanız:
1. Browser console'u açın (F12)
2. Hata mesajlarını okuyun
3. Google Sheet URL'ini ve sütun adlarını kontrol edin

## 📝 Lisans

Bu proje açık kaynakl ve özgürce kullanılabilir.

---

**Hazırlandı:** 2026  
**Firma:** Kırmızı Çiğköfte  
**Teknoloji:** HTML5, CSS3, JavaScript, Google Sheets API
