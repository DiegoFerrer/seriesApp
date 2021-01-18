import { NgModule } from '@angular/core'
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule} from '@angular/material/dialog';
import { MatInputModule} from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
    imports: [
        MatCardModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatInputModule,
        MatMenuModule,      
        MatFormFieldModule  
    ],
    exports: [
        MatCardModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatInputModule,
        MatMenuModule,
        MatFormFieldModule   
    ]
})
export class MaterialModule {}