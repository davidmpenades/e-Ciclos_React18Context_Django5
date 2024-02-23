# Generated by Django 5.0.1 on 2024-02-23 08:49

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Bikes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', models.SlugField(blank=True, max_length=200, unique=True)),
                ('name_bike', models.CharField(default='', max_length=200)),
                ('status', models.CharField(default='', max_length=200)),
                ('img_bike', models.CharField(default='', max_length=200)),
            ],
        ),
    ]
