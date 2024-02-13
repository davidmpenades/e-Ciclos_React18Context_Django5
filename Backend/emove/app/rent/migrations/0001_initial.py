# Generated by Django 5.0.1 on 2024-02-08 17:58

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('bikes', '0001_initial'),
        ('slots', '0002_alter_slots_id'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Rent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('initial_date', models.DateTimeField(auto_now_add=True)),
                ('end_date', models.DateTimeField(null=True)),
                ('bike', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='scooter', to='bikes.bikes')),
                ('end_slot', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='end_slot', to='slots.slots')),
                ('initial_slot', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='start_slot', to='slots.slots')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]