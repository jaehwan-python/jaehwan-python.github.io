from pathlib import Path
import shutil
import tempfile
import unittest
from bs4 import BeautifulSoup
from scripts.build_site import ROOT, build


class PublishingTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name).resolve()
        for folder in ('notes', 'pages', 'css', 'js', 'assets', 'scripts'):
            shutil.copytree(ROOT / folder, self.root / folder, ignore=shutil.ignore_patterns('__pycache__'))
        shutil.copy2(ROOT / 'index.html', self.root / 'index.html')

    def tearDown(self):
        self.temp.cleanup()

    def write(self, path, content):
        p = self.root / path
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(content, encoding='utf-8')
        return p

    def test_lifecycle(self):
        note = self.write('notes/AI-IT/python/functions.md', '# Functions\n\nFirst')
        out = build(self.root)
        self.assertEqual((self.root / 'index.html').read_bytes(), (out / 'index.html').read_bytes())
        self.assertEqual((self.root / 'js/main.js').read_bytes(), (out / 'js/main.js').read_bytes())
        self.assertEqual((self.root / 'css/style.css').read_bytes(), (out / 'css/style.css').read_bytes())
        index = out / 'pages/ai-it/study/python/index.html'
        self.assertEqual(index.read_text(encoding='utf-8').count('href="functions.html"'), 1)
        note.write_text('# Functions\n\nUpdated', encoding='utf-8')
        build(self.root)
        self.assertIn('Updated', (out / 'pages/ai-it/study/python/functions.html').read_text(encoding='utf-8'))
        note.unlink()
        (self.root / 'notes/AI-IT/python/variables.md').unlink()
        build(self.root)
        self.assertFalse((out / 'pages/ai-it/study/python/functions.html').exists())
        self.assertFalse((out / 'pages/ai-it/study/python/variables.html').exists())
        self.assertNotIn('functions.html', index.read_text(encoding='utf-8'))
        self.assertNotIn('href="variables.html"', index.read_text(encoding='utf-8'))
        self.assertTrue((self.root / 'pages/ai-it/study/python/variables.html').exists())

    def test_categories_security_links(self):
        for group, topic in [('AI-IT', 'sql'), ('English', 'grammar'), ('KAU', 'aviation')]:
            self.write(f'notes/{group}/{topic}/sample.md', '# Sample\n\nText')
        self.write('notes/AI-IT/python/images/chart.svg', '<svg xmlns="http://www.w3.org/2000/svg"/>')
        self.write('notes/AI-IT/python/security.md', '# Security\n\n```python\nprint("<tag>")\n```\n\n| A | B |\n| - | - |\n| 1 | 2 |\n\n![Chart](images/chart.svg)\n[Other](variables.md)\n[Heading](#security)\n<script>alert(1)</script>\n<img src="images/chart.svg" onerror="alert(1)">\n[Bad](javascript:alert(1))')
        out = build(self.root)
        for path in ['ai-it/study/sql', 'english/grammar', 'kau/aviation']:
            self.assertTrue((out / f'pages/{path}/sample.html').exists())
            self.assertIn('href="sample.html"', (out / f'pages/{path}/index.html').read_text(encoding='utf-8'))
        self.assertIn('sql/index.html', (out / 'pages/ai-it/study/index.html').read_text(encoding='utf-8'))
        soup = BeautifulSoup((out / 'pages/ai-it/study/python/security.html').read_text(encoding='utf-8'), 'html.parser')
        self.assertFalse(soup.find('script'))
        self.assertFalse(soup.select('[onerror], a[href^="javascript:"]'))
        self.assertIn('language-python', soup.select_one('pre code')['class'])
        self.assertEqual(soup.select_one('pre code').get_text(), 'print("<tag>")\n')
        self.assertTrue(soup.select_one('.table-scroll table'))
        self.assertTrue(soup.find('a', href='variables.html'))

    def test_manual_collision(self):
        manual = self.write('pages/ai-it/study/python/manual.html', '<h1>Manual</h1>')
        index = self.root / 'pages/ai-it/study/python/index.html'
        index.write_text(index.read_text(encoding='utf-8').replace('<div class="card-grid">', '<div class="card-grid"><a href="manual.html"><h3>Manual</h3></a>'), encoding='utf-8')
        out = build(self.root)
        self.assertEqual(manual.read_bytes(), (out / manual.relative_to(self.root)).read_bytes())
        self.assertIn('href="manual.html"', (out / index.relative_to(self.root)).read_text(encoding='utf-8'))
        self.write('notes/AI-IT/python/manual.md', '# Collision')
        with self.assertRaisesRegex(ValueError, 'collides'):
            build(self.root)

    def test_missing_link(self):
        self.write('notes/AI-IT/python/broken.md', '# Broken\n\n[Missing](missing.md)')
        with self.assertRaisesRegex(ValueError, 'missing'):
            build(self.root)

    def test_direct_category_notes(self):
        for folder, name, hub in [
            ('AI-IT', 'python_basics', 'ai-it/study'),
            ('English', 'grammar_01', 'english'),
            ('KAU', 'aviation_01', 'kau'),
        ]:
            self.write(f'notes/{folder}/{name}.md',
                       '# New note\n\n- First\n- Second\n\n1. One\n2. Two')
        out = build(self.root)
        for hub, name in [('ai-it/study', 'python_basics'),
                          ('english', 'grammar_01'), ('kau', 'aviation_01')]:
            listing = BeautifulSoup((out / f'pages/{hub}/index.html').read_text(encoding='utf-8'), 'html.parser')
            self.assertTrue(listing.select_one(f'.note-list a[href="{name}.html"]'))
            note = BeautifulSoup((out / f'pages/{hub}/{name}.html').read_text(encoding='utf-8'), 'html.parser')
            self.assertEqual(note.select_one('article h1').get_text(), 'New note')
            self.assertEqual(len(note.select('article ul li')), 2)
            self.assertEqual(len(note.select('article ol li')), 2)
        self.assertIn('python/variables.html', (out / 'pages/ai-it/study/index.html').read_text(encoding='utf-8'))
        for filename in ('AUTHORING',):
            self.assertFalse((out / f'pages/{filename}.html').exists())


if __name__ == '__main__':
    unittest.main()
