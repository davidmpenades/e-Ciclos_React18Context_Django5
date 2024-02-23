# Generated by Django 5.0.1 on 2024-02-23 08:49

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('incidents', '0001_initial'),
        ('slots', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='incidenceslot',
            name='slot',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='slot_affected', to='slots.slots'),
        ),
    ]
