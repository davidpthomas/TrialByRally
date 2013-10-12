Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    projectModel: null,
    projectTree: {
        name: 'RallyTrial',
        children: [
            {
                name: 'Company',
                children: [
                    {
                        name: 'Line of Business',
                        children: [
                            {
                                name: 'Pilot Team',
                                children: [
                                    {
                                        name: 'Company Team'
                                    },
                                    {
                                        name: 'Rally Team'
                                    }]
                            }]
                    }]
            }
        ]
    },
    launch: function() {

        this._loadProjectModel();
    },

    _createProjects: function(l) {

        var workspaceRef = '/workspace/699220';
        this._createProjectTree(workspaceRef, null, this.projectTree.name, this.projectTree.children)
    },    
    
    _createProjectTree: function(workspaceRef, parentProjectRef, projectName, children) {
        var me = this;
        console.log('creating project', workspaceRef, parentProjectRef, projectName, children);
        var record = Ext.create(this.projectModel, {
            Name: projectName,
            State: 'Open',
            Parent: parentProjectRef,
            Workspace: workspaceRef
        });
        console.log('record', record);
        record.save({
           callback: function(result, operation) {
               console.log('save result', result, operation);
               console.log(result.get('ObjectID'), result.get('Name'));
               var currParentProjectId = result.get('ObjectID');
               Ext.Array.each(children, function(child) {
                   console.log("child", child.name, child.children);
                   me._createProjectTree(workspaceRef, currParentProjectId, child.name, child.children);
               })
           } 
        });
    },
    _loadProjectModel: function() {
        Rally.data.ModelFactory.getModel({
            type: 'Project',
            context: this.getContext().getDataContext(),
            scope: this,
            success: function(model) {
                this.projectModel = model;
                this._createProjects();
            }
        }, this);
    }
});
